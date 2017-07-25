$(document).ready(function () {
    // create web audio api context
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var distortion = audioCtx.createWaveShaper();
    var gainNode = audioCtx.createGain();
    var biquadFilter = audioCtx.createBiquadFilter();
    var convolver = audioCtx.createConvolver();

    var volume = $('#gain');

    // create Oscillator node

    $('ul.keys').children().on('mousedown', function () { oscPlay(+this.value, 'sine') });
    $('ul.keys').children().on('mouseup', function () { oscStop() });

    var oscillator;

    var oscPlay = function (freq, waveForm) {
        oscillator = audioCtx.createOscillator();
        oscillator.type = waveForm;
        oscillator.frequency.value = freq; // value in hertz
        console.log(volume.val());
        gainNode.gain.value = volume.val();
        oscillator.connect(gainNode);
        // distortion.connect(biquadFilter);
        // biquadFilter.connect(convolver);
        // convolver.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
    }

    function oscStop() {
        oscillator.stop();
    }




})
