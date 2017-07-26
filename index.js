$(document).ready(function() {
    // create web audio api context
    var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    var distortion = audioCtx.createWaveShaper();
    var gainNode = audioCtx.createGain();
    var biquadFilter = audioCtx.createBiquadFilter();
    var convolver = audioCtx.createConvolver();

    var volume = $('#gain');
    var waveForm = $('#waveform');
    var filterFreq = $('#filterFreq');
    var filterGain = $('#filterGain');
    var filterType = $('#filterType');

    var oscillator;

    var oscPlay = function(freq) {
        oscillator = audioCtx.createOscillator();
        oscillator.type = waveForm.val();
        oscillator.frequency.value = freq; // value in hertz
        console.log(volume.val());
        gainNode.gain.value = volume.val();
        console.log(filterFreq.val());
        biquadFilter.frequency = +filterFreq.val();
        biquadFilter.type = filterType.val();
        biquadFilter.gain.value = +filterGain.val();
        oscillator.connect(biquadFilter);
        biquadFilter.connect(gainNode);
        // convolver.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
    }

    function oscStop() {
        oscillator.stop();
    }

    $('ul.keys').children().on('mousedown', function() {
        oscPlay(+this.value)
    });
    $('ul.keys').children().on('mouseup', function() {
        oscStop()
    });


})