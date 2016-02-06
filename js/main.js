/**
 * Created by Jeff on 2016/2/6.
 */
function parseClock(sec) {
    var h = Math.floor(sec / 3600);
    var m = Math.floor(sec % 3600 / 60);
    var s = Math.floor(sec % 3600 % 60);
    return (h < 10 ? '0' + h : h) + ' : ' +
        (m < 10 ? '0' + m : m) + ' : ' +
        (s < 10 ? '0' + s : s);
}

$(function () {
    var isCounting = false;
    var isBreak = false;
    var sessionLength = 25;
    var breakLength = 5;
    var sec;
    var timer1 = null;
    var $cd = $('#countdown');
    var $sl = $('#session-length');
    var $bl = $('#break-length');

    $cd.text(sessionLength);
    setText();
    changeTask();
    setSec();
    $('#session-add').on('click', function() {
        if (!isCounting) {
            sessionLength++;
            if (!isBreak) {
                sec = sessionLength * 60;
                $cd.text(sessionLength);
            }
            setText();
        }

    });
    $('#session-diff').on('click', function() {
        if (!isCounting) {
            sessionLength--;
            if (sessionLength < 0) {
                sessionLength = 0;
            }
            if (!isBreak) {
                sec = sessionLength * 60;
                $cd.text(sessionLength);
            }
            setText();
        }

    });
    $('#break-add').on('click', function() {
        if (!isCounting) {
            breakLength++;
            if (isBreak) {
                sec = breakLength * 60;
                $cd.text(breakLength);
            }
            setText();
        }
    });
    $('#break-diff').on('click', function() {
        if (!isCounting) {
            breakLength--;

            if (breakLength < 0) {
                breakLength = 0;
            }
            if (isBreak) {
                sec = breakLength * 60;
                $cd.text(breakLength);
            }
            setText();
        }
    });

    function setText() {
        $sl.text(sessionLength);
        $bl.text(breakLength);
    }
    // 更改圆圈内显示的文字，是Break，还是Session
    function changeTask () {
        $('#task').text(isBreak ? 'Break' : 'Session');
    }

    function setSec() {
        sec = isBreak ? breakLength * 60 : sessionLength * 60;
    }
    function startCountdown() {

        timer1 && stopCountdown();
        timer1 = setInterval(function() {
            changeTask();
            sec--;
            $cd.text(parseClock(sec));
            if (sec <= 0) {
                stopCountdown();
                isBreak = !isBreak;
                setSec();
                startCountdown();
            }
        }, 1000);
    }

    function stopCountdown() {
        clearInterval(timer1);
        timer1 = null;
    }

    $('.clock').on('click', function() {
        if (timer1) {
            stopCountdown();
            isCounting = false;
        } else {
            startCountdown();
            isCounting = true;
        }
    })
});