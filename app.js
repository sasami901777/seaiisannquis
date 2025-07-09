// app.js
// DOM要素の取得
const heritageImage = document.getElementById('heritage-image');
const questionText = document.getElementById('question-text');
const choicesArea = document.getElementById('choices-area');
const feedbackMessage = document.getElementById('feedback-message');
const explanationArea = document.getElementById('explanation-area');
const heritageName = document.getElementById('heritage-name');
const heritageDescription = document.getElementById('heritage-description');
const nextButton = document.getElementById('next-question');
const restartButton = document.getElementById('restart-button');
const progressFill = document.getElementById('progress-fill');

// 世界遺産のデータ
// 実際のアプリでは、より多くのデータや外部APIからの取得を検討してください。
// imageUrls は配列として複数のURLを持つことができ、loadImageWithFallback 関数が順番に試します。
const worldHeritageData = [
    {
        name: "万里の長城",
        country: "中国",
        imageUrls: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/640px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
            "https://picsum.photos/640/480?random=1" // フォールバック用
        ],
        description: "紀元前から建設が始まり、歴代王朝によって増改築が繰り返された巨大な城壁。異民族の侵入を防ぐために築かれました。"
    },
    {
        name: "コロッセオ",
        country: "イタリア",
        imageUrls: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/640px-Colosseo_2020.jpg",
            "https://picsum.photos/640/480?random=2"
        ],
        description: "古代ローマ時代に建設された円形闘技場。剣闘士の試合や公開処刑などが行われ、ローマ帝国の威厳を象徴しています。"
    },
    {
        name: "タージ・マハル",
        country: "インド",
        imageUrls: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Taj_Mahal%2C_Agra%2C_India_-_Diliff.jpg/640px-Taj_Mahal%2C_Agra%2C_India_-_Diliff.jpg",
            "https://www.his-j.com/theme/world-heritage/asia/india/taj-mahal/img/main02.jpg",
            "https://picsum.photos/640/480?random=3"
        ],
        description: "ムガル帝国第5代皇帝シャー・ジャハーンが、愛妃ムムターズ・マハルのために建設した白亜の霊廟。イスラム建築の最高傑作と評されます。"
    },
    {
        name: "マチュ・ピチュ",
        country: "ペルー",
        imageUrls: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Machu_Picchu%2C_Peru.jpg/640px-Machu_Picchu%2C_Peru.jpg",
            "https://picsum.photos/640/480?random=4"
        ],
        description: "インカ帝国の空中都市として知られる遺跡。アンデス山脈の標高2,430mの尾根に位置し、その建築技術と景観は世界を魅了します。"
    },
    {
        name: "ギザのピラミッド",
        country: "エジプト",
        imageUrls: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/640px-All_Gizah_Pyramids.jpg",
            "https://www.his-j.com/theme/world-heritage/asia/india/taj-mahal/img/main01.jpg",
            "https://picsum.photos/640/480?random=5"
        ],
        description: "古代エジプトのファラオの墓として建設された巨大な石造建築物。クフ王のピラミッドは、古代世界の七不思議の一つです。"
    },
    {
        name: "グランド・キャニオン",
        country: "アメリカ合衆国",
        imageUrls: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Grand_Canyon_from_Mather_Point.jpg/640px-Grand_Canyon_from_Mather_Point.jpg",
            "https://www.his-j.com/theme/world-heritage/north-america/america/grand-canyon/img/main04.jpg",
            "https://picsum.photos/640/480?random=8"
        ],
        description: "コロラド高原を流れるコロラド川が形成した、雄大な渓谷。地球の歴史を物語る地層が露出しており、その壮大な景観は世界中の人々を魅了します。"
    },
    {
        name: "アクロポリス",
        country: "ギリシャ",
        imageUrls: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Parthenon_from_Propylaea.jpg/640px-Parthenon_from_Propylaea.jpg",
            "https://th.bing.com/th/id/R.a49853940e2de637ccb89dcca5a95e5f?rik=XZvlFoEjQYeNoQ&riu=http%3a%2f%2ftraveldigg.com%2fwp-content%2fuploads%2f2016%2f08%2fAcropolis-of-Athens-Photo.jpg&ehk=vV4KR6wvB1K5N2UWUXm1pSWfvrVcJDcLdtW6nsm75FQ%3d&risl=&pid=ImgRaw&r=0",
            "https://picsum.photos/640/480?random=9"
        ],
        description: "アテネの中心部にある小高い丘で、古代ギリシャの代表的な建築物であるパルテノン神殿などが建ち並びます。民主主義発祥の地としても知られています。"
    },
    {
        name: "モン・サン＝ミシェル",
        country: "フランス",
        imageUrls: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Mont_Saint-Michel_at_dawn.jpg/640px-Mont_Saint-Michel_at_dawn.jpg",
            "https://th.bing.com/th/id/R.1c8b4d061e807921f3857defd7ea7513?rik=k5mf%2b%2fjn065bTA&riu=http%3a%2f%2fwadaphoto.jp%2fkikou%2fimages%2fmonsan13l.jpg&ehk=wkepRWFSgqumPGAwMnm8ugN2lBItJ4islOnCqAPGe9o%3d&risl=&pid=ImgRaw&r=0",
            "https://picsum.photos/640/480?random=10"
        ],
        description: "フランス北西部の海岸に浮かぶ岩山に築かれた修道院。潮の満ち引きによって陸と隔絶される神秘的な景観は、「西洋の驚異」と称されます。"
    },
    {
        name: "シドニー・オペラハウス",
        country: "オーストラリア",
        imageUrls: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Sydney_Opera_House_-_Dec_2008.jpg/640px-Sydney_Opera_House_-_Dec_2008.jpg",
            "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/474000/474916-Sydney-Opera-House.jpg",
            "https://picsum.photos/640/480?random=11"
        ],
        description: "シドニーの象徴的な建造物であり、20世紀を代表する建築物の一つ。貝殻のような独特の屋根が特徴で、世界的に有名なコンサートホールです。"
    },
    {
        name: "ケルン大聖堂",
        country: "ドイツ",
        imageUrls: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Cologne_Cathedral_from_the_Rhine.jpg/640px-Cologne_Cathedral_from_the_Rhine.jpg",
            "https://worldheritage.online/wp-content/uploads/2021/06/shutterstock_1360865633.jpg",
            "https://picsum.photos/640/480?random=14"
        ],
        description: "ドイツのケルンにあるゴシック様式の大聖堂。その壮麗な建築と、聖遺物を納めるために建設された歴史的背景を持つ、ドイツを代表する建築物です。"
    },
    {
        name: "イグアス国立公園",
        country: "ブラジル",
        imageUrls: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Iguazu_Falls_from_Brazil_side.jpg/640px-Iguazu_Falls_from_Brazil_side.jpg",
            "https://th.bing.com/th/id/R.9b07b5050dc1f8c2ad19c2d370f13747?rik=15eZlFxD0VSYEQ&riu=http%3a%2f%2fworldheritage.online%2fwp-content%2fuploads%2f2021%2f11%2fshutterstock_1338447983-1024x683.jpg&ehk=6zBhcxLU%2bw%2bL%2b%2fMPdmp%2fXXRLcBbfMMAOc2z3i9lGnFs%3d&risl=&pid=ImgRaw&r=0", // 修正されたURL
            "https://picsum.photos/640/480?random=16"
        ],
        description: "アルゼンチンとの国境に位置する世界最大級の滝、イグアスの滝を中心とした国立公園。その圧倒的な水量と雄大な自然は圧巻です。"
    },
    {
        name: "サグラダ・ファミリア", // 正式名称は「アントニ・ガウディの作品群」の一部
        country: "スペイン",
        imageUrls: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Sagrada_Familia_from_the_south_2019_01.jpg/640px-Sagrada_Familia_from_the_south_2019_01.jpg",
            "https://i2.wp.com/media.thisisgallery.com/wp-content/uploads/2022/10/AdobeStock_384161226-1-scaled.jpeg?resize=2560%2C1709&ssl=1",
            "https://picsum.photos/640/480?random=20"
        ],
        description: "アントニ・ガウディが設計した未完の教会。独特の建築様式と壮大なスケールで知られ、バルセロナの象徴です。"
    },
    {
        name: "イースター島のラパ・ヌイ国立公園",
        country: "チリ",
        imageUrls: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Moai_Rano_Raraku.jpg/640px-Moai_Rano_Raraku.jpg",
            "https://tvmatome.net/wp-content/uploads/2015/12/moai.jpg",
            "https://picsum.photos/640/480?random=22"
        ],
        description: "太平洋に浮かぶ孤島に点在する巨大な石像「モアイ」で知られる国立公園。その起源や建造方法は未だ多くの謎に包まれています。"
    }
];

// ゲーム設定
const QUIZ_LIMIT = 3; // ここを10から3に修正
let currentQuestionCount = 0;
let availableHeritageIndices = [];
let currentHeritage = null;
let correctAnswers = 0;

// 配列をシャッフルする関数
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// プログレスバーを更新
function updateProgress() {
    const progress = (currentQuestionCount / QUIZ_LIMIT) * 100;
    progressFill.style.width = `${progress}%`;
}

// ランダムな世界遺産を取得（選択肢生成用）
function getRandomHeritage() {
    return worldHeritageData[Math.floor(Math.random() * worldHeritageData.length)];
}

// クイズを初期化
function initializeQuiz() {
    currentQuestionCount = 0;
    correctAnswers = 0;
    availableHeritageIndices = Array.from({ length: worldHeritageData.length }, (_, i) => i);
    shuffleArray(availableHeritageIndices);
    updateProgress();
    generateQuestion();
    // クイズ開始時にボタンの表示をリセット
    nextButton.style.display = 'none';
    restartButton.style.display = 'none';
}

// 次の世界遺産を取得
function getNextHeritage() {
    if (availableHeritageIndices.length === 0) {
        // 全て使い切った場合、再度シャッフル
        availableHeritageIndices = Array.from({ length: worldHeritageData.length }, (_, i) => i);
        shuffleArray(availableHeritageIndices);
    }
    const nextIndex = availableHeritageIndices.pop();
    return worldHeritageData[nextIndex];
}

// 国名の選択肢を生成
function generateCountryChoices(correctCountry) {
    let choices = [correctCountry];
    while (choices.length < 4) {
        const randomHeritage = getRandomHeritage();
        const choiceToAdd = randomHeritage.country;
        if (!choices.includes(choiceToAdd)) {
            choices.push(choiceToAdd);
        }
    }
    shuffleArray(choices);
    return choices;
}

// 画像を読み込む関数（フォールバック付き）
function loadImageWithFallback(imageUrls, imageElement) {
    let currentIndex = 0;
    
    function tryLoadImage() {
        if (currentIndex >= imageUrls.length) {
            // 全てのURLが失敗した場合、プレースホルダー画像を表示
            imageElement.src = 'https://via.placeholder.com/640x480/667eea/ffffff?text=画像なし';
            imageElement.alt = '画像を読み込めませんでした';
            return;
        }
        
        const img = new Image();
        img.onload = function() {
            imageElement.src = imageUrls[currentIndex];
            imageElement.alt = currentHeritage.name;
        };
        img.onerror = function() {
            console.warn(`画像のロードに失敗しました: ${imageUrls[currentIndex]}. 次のURLを試します。`);
            currentIndex++;
            tryLoadImage(); // 次のURLを試す
        };
        img.src = imageUrls[currentIndex];
    }
    
    tryLoadImage();
}

// 新しい問題を生成
function generateQuestion() {
    if (currentQuestionCount >= QUIZ_LIMIT) {
        endQuiz();
        return;
    }

    currentQuestionCount++;
    updateProgress(); // プログレスバーを更新

    feedbackMessage.textContent = '';
    feedbackMessage.className = '';
    choicesArea.innerHTML = '';
    explanationArea.style.display = 'none';
    nextButton.style.display = 'none';
    restartButton.style.display = 'none'; // 問題中は再開ボタンを隠す

    currentHeritage = getNextHeritage();
    if (!currentHeritage) {
        questionText.textContent = '問題の生成に失敗しました。';
        return;
    }

    questionText.textContent = `第 ${currentQuestionCount} 問: この世界遺産がある国はどこ？`;
    
    // 画像を読み込み（複数のURLを試す）
    loadImageWithFallback(currentHeritage.imageUrls, heritageImage);

    const choices = generateCountryChoices(currentHeritage.country);

    choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice-button');
        button.addEventListener('click', () => checkAnswer(choice, currentHeritage.country, button));
        choicesArea.appendChild(button);
    });
}

// 解答をチェック
function checkAnswer(selectedAnswer, correctAnswer, clickedButton) {
    Array.from(choicesArea.children).forEach(button => {
        button.disabled = true; // 全てのボタンを無効化
        if (button.textContent === correctAnswer) {
            button.classList.add('correct-answer'); // 正解のボタンを緑色にする
        }
    });

    if (selectedAnswer === correctAnswer) {
        correctAnswers++; // 正解数をインクリメント
        feedbackMessage.textContent = '🎉 正解です！素晴らしい！';
        feedbackMessage.classList.add('correct');
        clickedButton.classList.add('correct-answer');
    } else {
        feedbackMessage.textContent = `残念、不正解です。正解は「${correctAnswer}」でした。`;
        feedbackMessage.classList.add('incorrect');
        clickedButton.classList.add('wrong-answer');
    }

    heritageName.textContent = currentHeritage.name;
    heritageDescription.textContent = currentHeritage.description;
    explanationArea.style.display = 'block';

    nextButton.style.display = 'inline-block'; // 次の質問ボタンを表示
    nextButton.textContent = (currentQuestionCount < QUIZ_LIMIT) ? '次の問題' : 'クイズ終了';
}

// クイズを終了
function endQuiz() {
    questionText.innerHTML = `<div class="final-score">クイズ終了！<br>正解数: ${correctAnswers}/${QUIZ_LIMIT}</div>`;
    heritageImage.src = '';
    heritageImage.alt = '';
    choicesArea.innerHTML = '';
    feedbackMessage.textContent = '';
    explanationArea.style.display = 'none';
    nextButton.style.display = 'none';
    restartButton.style.display = 'inline-block'; // クイズ終了時に再開ボタンを表示
}

// イベントリスナーの設定
nextButton.addEventListener('click', generateQuestion);
restartButton.addEventListener('click', initializeQuiz);

// ページ読み込み時にクイズを初期化
document.addEventListener('DOMContentLoaded', initializeQuiz);
