// sw.js
const CACHE_NAME = 'world-heritage-quiz-v2'; // キャッシュの名前とバージョンを更新
const ASSETS = [
    '/', // ルートパス (index.html)
    'index.html', // 相対パス
    'styles.css',
    'app.js',
    'manifest.json',
    // アイコン画像もキャッシュ対象に含める (プレースホルダーURLではなく、実際のアイコンパスの場合)
    // '/images/icons/icon-72x72.png',
    // '/images/icons/icon-96x96.png',
    // ... 他のアイコンサイズ
    // 注意: manifest.jsonで外部URLのplaceholderを使っている場合、
    // ここでキャッシュしても意味がありません。実際のアイコンを配置した場合のみ有効です。
];

// インストールイベント: Service Worker がインストールされたときにキャッシュを初期化
self.addEventListener('install', (event) => {
    console.log('Service Worker: インストール中...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: キャッシュにアセットを追加中...');
                return cache.addAll(ASSETS);
            })
            .catch((error) => {
                console.error('Service Worker: キャッシュの追加に失敗しました', error);
            })
    );
});

// アクティベートイベント: 古いキャッシュを削除
self.addEventListener('activate', (event) => {
    console.log('Service Worker: アクティベート中...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: 古いキャッシュを削除中:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// フェッチイベント: ネットワークリクエストをインターセプトし、キャッシュから提供
self.addEventListener('fetch', (event) => {
    // 世界遺産画像のURLは外部ドメインなので、キャッシュせずネットワークから取得を試みる
    // オフライン時は画像が表示されない可能性がある
    if (event.request.url.startsWith('https://upload.wikimedia.org/') || event.request.url.startsWith('https://picsum.photos/') || event.request.url.startsWith('https://www.his-j.com/') || event.request.url.startsWith('https://th.bing.com/') || event.request.url.startsWith('https://worldheritage.online/') || event.request.url.startsWith('https://www.yamanashi-kankou.jp/') || event.request.url.startsWith('https://cdn.4travel.jp/') || event.request.url.startsWith('https://i2.wp.com/') || event.request.url.startsWith('https://www.club-t.com/') || event.request.url.startsWith('https://tvmatome.net/') || event.request.url.startsWith('https://via.placeholder.com/')) {
        // 画像URLが外部の場合、キャッシュせずネットワークから取得を試みる
        // fetchが失敗した場合、アプリ内のloadImageWithFallback関数がプレースホルダーを表示します
        event.respondWith(fetch(event.request).catch(() => {
            // 外部画像が取得できない場合、フォールバックとして空のレスポンスを返すか、
            // 特定のオフライン画像などを返すことも可能ですが、今回はシンプルにフェッチ失敗を許容
            return new Response(null, { status: 503, statusText: 'Service Unavailable' });
        }));
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // キャッシュにレスポンスがあればそれを返す
                if (response) {
                    console.log('Service Worker: キャッシュから取得:', event.request.url);
                    return response;
                }
                // キャッシュになければネットワークから取得し、キャッシュに追加
                console.log('Service Worker: ネットワークから取得:', event.request.url);
                return fetch(event.request).then((networkResponse) => {
                    // レスポンスが有効かチェック
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                        return networkResponse;
                    }
                    // レスポンスをキャッシュにコピーして返す
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    return networkResponse;
                });
            })
            .catch((error) => {
                console.error('Service Worker: フェッチエラー:', error);
                // オフライン時にキャッシュにもない場合、オフラインページなどを返すことも可能
                // return caches.match('/offline.html'); // 例: オフラインページ
            })
    );
});
