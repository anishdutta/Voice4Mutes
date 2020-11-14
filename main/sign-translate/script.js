var animationSpeed = 400;


function words2Faces(userText) {
  var userTextL = userText.toLowerCase();
  //strip punctuation
  var punc = /[ï¿½`~\"\/'_\-[\]{}()*+!?%&.,\\^$|#@<>|+=;:\u2018\u2019\u201C\u201D]/g;
  var noPunc = userTextL.replace(punc,"");
  var words = noPunc.split("");

  //remove all spaces
  for (var i = 0; i < words.length; i++) {
    if (words[i] === " ") {
      words.splice(i, 1);
    } else if (words.indexOf(words[i]) == words.length) {
      return false;
    }
  }

  var allofEm = words;

  //replace all phonemes with their class names
  for (var i = 0; i < allofEm.length; i++) {
    if (allofEm[i] == "a") {
      allofEm[i] = "asl-a";
    } else if (allofEm[i] == "b") {
      allofEm[i] = "asl-b";
    } else if (allofEm[i] == "c") {
      allofEm[i] = "asl-c";
    } else if (allofEm[i] == "d") {
      allofEm[i] = "asl-d";
    } else if (allofEm[i] == "e") {
      allofEm[i] = "asl-e";
    } else if (allofEm[i] == "f") {
      allofEm[i] = "asl-f";
    } else if (allofEm[i] == "g") {
      allofEm[i] = "asl-g";
    } else if (allofEm[i] == "h") {
      allofEm[i] = "asl-h";
    } else if (allofEm[i] == "i") {
      allofEm[i] = "asl-i";
    } else if (allofEm[i] == "j") {
      allofEm[i] = "asl-j";
    } else if (allofEm[i] == "k") {
      allofEm[i] = "asl-k";
    } else if (allofEm[i] == "l") {
      allofEm[i] = "asl-l";
    } else if (allofEm[i] == "m") {
      allofEm[i] = "asl-m";
    } else if (allofEm[i] == "n") {
      allofEm[i] = "asl-n";
    } else if (allofEm[i] == "o") {
      allofEm[i] = "asl-o";
    } else if (allofEm[i] == "p") {
      allofEm[i] = "asl-p";
    } else if (allofEm[i] == "q") {
      allofEm[i] = "asl-q";
    } else if (allofEm[i] == "r") {
      allofEm[i] = "asl-r";
    } else if (allofEm[i] == "s") {
      allofEm[i] = "asl-s";
    } else if (allofEm[i] == "t") {
      allofEm[i] = "asl-t";
    } else if (allofEm[i] == "u") {
      allofEm[i] = "asl-u";
    } else if (allofEm[i] == "v") {
      allofEm[i] = "asl-v";
    } else if (allofEm[i] == "w") {
      allofEm[i] = "asl-w";
    } else if (allofEm[i] == "x") {
      allofEm[i] = "asl-x";
    } else if (allofEm[i] == "y") {
      allofEm[i] = "asl-y";
    } else if (allofEm[i] == "z") {
      allofEm[i] = "asl-z";
    }
  }

  //add a rest face at the end
  //allofEm.push("rest");

  //this function spits out an array of class names coresponding to the animation face of each phoneme when called
  return allofEm;
} //END

var userInput = document.getElementById("what2Say").value;

var classArray = [];


function loopEm(putMeHere) {
  classArray = [];
  //var classArray = ["asl-a","asl-b","asl-c","asl-d","asl-e","asl-f","asl-g","asl-h","asl-i","asl-j","asl-k","asl-l","asl-m","asl-n","asl-o","asl-p","asl-q","asl-r","asl-s","asl-t","asl-u","asl-v","asl-w","asl-x","asl-y","asl-z"];
  var userText2 = document.getElementById("what2Say").value;
  classArray = words2Faces(userText2);
  var cal = classArray.length;
  //creates a variable to be incremented
  var classChanges = 0;
  (function nextClass() {
    setTimeout(function() {
      //don't rearrange until after the first one is displayed
      if (classChanges != 0) {
        //removes the first array item and pushes it to the end of the array
        classArray.push(classArray.shift());
      }
      //removes all classes and adds whichever class is in the current 0 spot
      var c = document.getElementById(putMeHere);
      c.className = "asl";
      c.classList.add(classArray[0]);
      //increments the variable
      classChanges++;
      if (classChanges < classArray.length + 1) {
        //runs the parent function again after a timeout setting
        nextClass();
      } else {
        //once the classChanges variable gets to the length of the classArray, clear all classes, stay on last letter and stop.
        c.className = "";
        c.classList.add("asl");
        c.classList.add(classArray[classArray.length-1]);//stay on last letter
        return false;
      }
    }, animationSpeed); // delay
  })();
  
  document.getElementById("spelledOut").innerHTML="";
  
  //create boxes in the side area
  for (var i=0;i<classArray.length;i++){
    if(classArray[i]==="asl-u"||classArray[i]==="asl-w"||classArray[i]==="asl-r"||classArray[i]==="asl-k"||classArray[i]==="asl-z"||classArray[i]==="asl-v"||classArray[i]==="asl-b"||classArray[i]==="asl-f"||classArray[i]==="asl-d"){
      document.getElementById("spelledOut").innerHTML += "<span class='asl3 " + classArray[i] + "' title='" + classArray[i].charAt(4) + "'></span><br/>";
    }else if(classArray[i]==="asl-g"||classArray[i]==="asl-h"){
      document.getElementById("spelledOut").innerHTML += "<span class='asl4 " + classArray[i] + "' title='" + classArray[i].charAt(4) + "'></span><br/>";
    }else{
    document.getElementById("spelledOut").innerHTML += "<span class='asl2 " + classArray[i] + "' title='" + classArray[i].charAt(4) + "'></span><br/>";
  }
}
}

function aslContainer() {
  loopEm("aslContainer");
}
//link function to clicks on the body or pushing ENTER
document.getElementById("aslContainer").addEventListener("click", aslContainer);
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
  if (e.keyCode == 13) {
    loopEm("aslContainer");
  }
}

// Just a prototype...a good starting point?
const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : false;

new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data() {
    return {
      lang: "en_US",
      error: false,
      speaking: false,
      toggle: false,
      runtimeTranscription: "",
      sentences: [],
      text: "",
      rules: [v => v.length <= 5000 || "Max 5,000 characters"],
      info:
      "For best use: Dictate one sentence at a time. Clicking mic at end of each sentence. It will add capitalization to first letter of current sentence and add a period to end of prior sentence. Enjoy!!" };

  },
  computed: {
    hasText() {
      return this.text.length > 0 ? true : false;
    } },

  methods: {
    cleanReset() {
      this.error = false;
      this.speaking = false;
      this.toggle = false;
      this.runtimeTranscription = "";
      this.sentences = [];
      this.text = "";
    },
    speechEnd({ sentences, text }) {
      this.sentences = sentences;
      this.text = text;
    },
    checkCompatibility() {
      if (!recognition) {
        this.error =
        "Speech Recognition is not available on this browser. Please use Chrome or Firefox";
      }
    },

    endSpeechRecognition() {
      recognition.stop();
      this.toggle = false;
      this.speaking = false;

      if (this.text.length >= 1) {
        setTimeout(() => {
          this.speechEnd({
            sentences: this.sentences,
            text: `${this.text}. ${this.sentences.join(". ")}` });

        }, 500);
      } else {
        setTimeout(() => {
          this.speechEnd({
            sentences: this.sentences,
            text: `${this.sentences.join(". ")}` });

        }, 500);
      }
    },

    startSpeechRecognition() {
      this.toggle = true;

      recognition.lang = this.lang;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onspeechstart = () => {
        this.speaking = true;
      };

      recognition.onspeechend = () => {
        this.speaking = false;
      };

      recognition.onresult = event => {
        if (typeof event.results === "undefined") {
          recognition.stop();
          return;
        }

        if (this.text.length >= 1) {
          this.sentences = [];
        }

        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            let finalSentence = event.results[i][0].transcript;

            this.runtimeTranscription = event.results[i][0].transcript;

            this.sentences.push(this.capitalizeFirstLetter(finalSentence));
          } else {
            this.runtimeTranscription = event.results[i][0].transcript;
          }
        }
      };

      recognition.start();
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } },

  created() {},
  mounted() {
    this.checkCompatibility();
  },
  beforeDestroy() {
    recognition.abort();
  } });