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