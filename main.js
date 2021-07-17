Webcam.set({
    width: 350,
    height: 300,
    Image_format: 'png',
    png_quality: 90
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_img" src="'+data_uri+'"/>'
    });
}

console.log('ml5 version:',ml5.version );

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/LY7tU3bDk/model.json', modelLoaded);

function modelLoaded(){
    console.log("model loaded");
}
var Prediction_1="";
var Prediction_2="";
function speak(){
    var synth=window.speechSynthesis;
    speak_data1="The 1st Prediction is"+Prediction_1;
    speak_data2="The 2nd Prediction is"+Prediction_2;
    //SpeechSynthesisUtterance is a function of API window.speechSynthesis which will convert text to speech
    //we use the keyword new because everytime for every next result we want to convert it to text to speech
    var utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        Prediction_1=results[0].label;
        Prediction_2=results[1].label;
        speak();
        if(Prediction_1 == "Happy"){
            document.getElementById("update_emoji").innerHTML= "&#128522;";
        }
        if(Prediction_1 == "Sad"){
            document.getElementById("update_emoji").innerHTML= "&#128577;";
        }
        if(Prediction_1 == "Angry"){
            document.getElementById("update_emoji").innerHTML= "&#128544;";
        }
        if(Prediction_1 == "Silly"){
            document.getElementById("update_emoji").innerHTML= "&#129322;";
        }
        if(Prediction_1 == "Laughing"){
            document.getElementById("update_emoji").innerHTML= "&#129315;";
        }
        if(Prediction_1 == "Sleepy"){
            document.getElementById("update_emoji").innerHTML= "&#128564;";
        }
        //
        //
        if(Prediction_2 == "Happy"){
            document.getElementById("update_emoji2").innerHTML= "&#128522;";
        }
        if(Prediction_2 == "Sad"){
            document.getElementById("update_emoji2").innerHTML= "&#128577;";
        }
        if(Prediction_2 == "Angry"){
            document.getElementById("update_emoji2").innerHTML= "&#128544;";
        }
        if(Prediction_2 == "Silly"){
            document.getElementById("update_emoji2").innerHTML= "&#129322;";
        }
        if(Prediction_2 == "Laughing"){
            document.getElementById("update_emoji2").innerHTML= "&#129315;";
        }
        if(Prediction_2 == "Sleepy"){
            document.getElementById("update_emoji2").innerHTML= "&#128564;";
        }
    }
}