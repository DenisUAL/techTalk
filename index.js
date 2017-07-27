$(document)
    .ready(function () {
        // create web audio api context
        var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
        var gainNode = audioCtx.createGain();
        var biquadFilter = audioCtx.createBiquadFilter();

        var volume = $('#gain');
        var waveForm = $('#waveform');
        var filterFreq = $('#filterFreq');
        var filterGain = $('#filterGain');
        var filterType = $('#filterType');
        var qFactor = $('#qFactor');

        var oscillator = audioCtx.createOscillator();

        var updateParams = function () {

            oscillator.type = waveForm.val();

            gainNode.gain.value = +volume.val();

            biquadFilter.type = filterType.val();
            biquadFilter.frequency.value = +filterFreq.val();
            biquadFilter.gain.value = +filterGain.val();
            biquadFilter.Q.value = +qFactor.val();

            oscillator.connect(biquadFilter);
            biquadFilter.connect(gainNode);
            gainNode.connect(audioCtx.destination);
        }

        function oscStop() {
            oscillator.stop();
        }

        var isPlaying = false;

        var setInt;
        $('ul.keys')
            .children()
            .on('dblclick', function () {
                if (!isPlaying) {
                    isPlaying = true;
                    oscillator.start();
                    setInt = setInterval(() => updateParams(), 5)
                } else {
                    isPlaying = false;
                    clearInterval(setInt);
                    oscStop();
                }
            });

        $('ul.keys')
            .children()
            .on('click', function () {
                oscillator.frequency.value = +this.value
            });
    })






