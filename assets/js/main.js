(function($) {

    skel.breakpoints({
        wide: '(min-width: 961px) and (max-width: 1880px)',
        normal: '(min-width: 961px) and (max-width: 1620px)',
        narrow: '(min-width: 961px) and (max-width: 1320px)',
        narrower: '(max-width: 960px)',
        mobile: '(max-width: 736px)'
    });

    $(function() {

        var $window = $(window),
            $body = $('body');

        $body.addClass('is-loading');

        $window.on('load', function() {
            $body.removeClass('is-loading');
        });

        if (skel.vars.IEVersion < 9)
            $(':last-child').addClass('last-child');

        $('form').placeholder();
        skel.on('+mobile -mobile', function() {
            $.prioritize(
                '.important\\28 mobile\\29',
                skel.breakpoint('mobile').active
            );
        });
        $('.scrolly').scrolly();
        var $nav_a = $('#nav a');

        $nav_a
            .scrolly()
            .on('click', function(e) {

                var t = $(this),
                    href = t.attr('href');

                if (href[0] != '#')
                    return;

                e.preventDefault();
                $nav_a
                    .removeClass('active')
                    .addClass('scrollzer-locked');
                t.addClass('active');

            });
        var ids = [];

        $nav_a.each(function() {

            var href = $(this).attr('href');

            if (href[0] != '#')
                return;

            ids.push(href.substring(1));

        });

        $.scrollzer(ids, {
            pad: 200,
            lastHack: true
        });
        $(
                '<div id="headerToggle">' +
                '<a href="#header" class="toggle"></a>' +
                '</div>'
            )
            .appendTo($body);

        // Header.
        $('#header')
            .panel({
                delay: 500,
                hideOnClick: true,
                hideOnSwipe: true,
                resetScroll: true,
                resetForms: true,
                side: 'left',
                target: $body,
                visibleClass: 'header-visible'
            });
        if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
            $('#headerToggle, #header, #main')
            .css('transition', 'none');

    });

})(jQuery);

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            document.getElementById("holders").innerHTML = (JSON.parse(xmlHttp.responseText).holdersCount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}
httpGetAsync("https://api.ethplorer.io/getTokenInfo/0x7f2176ceb16dcb648dc924eff617c3dc2befd30d?apiKey=freekey");

function httpGetAsync1(theUrl1, callback) {
    var xmlHttp1 = new XMLHttpRequest();
    xmlHttp1.onreadystatechange = function() {
        if (xmlHttp1.readyState == 4 && xmlHttp1.status == 200)
            document.getElementById("presale").innerHTML = Number(JSON.parse(xmlHttp1.responseText).ETH.totalIn.toFixed(5)) + 1;
    }

    xmlHttp1.open("GET", theUrl1, true);
    xmlHttp1.send(null);
}

httpGetAsync1("https://api.ethplorer.io/getAddressInfo/0xa33f2333fef94297216bfb32ed37a5d9ea3c1822?apiKey=freekey");


function httpGetAsync2(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            document.getElementById("amount1").innerHTML = ((JSON.parse(xmlHttp.responseText)).tokens[0].balance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}
httpGetAsync2("https://api.ethplorer.io/getAddressInfo/0xa33f2333FeF94297216bfB32ED37A5d9EA3c1822?apiKey=freekey");

const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;
let countDown = new Date('Dec 12, 2017 00:00:00').getTime(),
    x = setInterval(function() {
        let now = new Date().getTime(),
            distance = countDown - now;
        document.getElementById('days').innerHTML = Math.floor(distance / (day)),
            document.getElementById('hours').innerHTML = Math.floor((distance % (day)) / (hour)),
            document.getElementById('minutes').innerHTML = Math.floor((distance % (hour)) / (minute)),
            document.getElementById('seconds').innerHTML = Math.floor((distance % (minute)) / second);
    }, second)

	
$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    });
    $('#scroll').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
});

function postContactToGoogle() {
    var address = $('#address').val();
    $.ajax({
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdcjeKlQ_znro9_eMbxtoDgH1C-4SrA74njjSkCVwrf2wk8_g/formResponse",
        data: {
            "entry_54163507": address
        },
        type: "POST",
        dataType: "xml",
        statusCode: {
            0: function() {
                alert("Sent");
            },
            200: function() {
                alert("Failed");
            }
        }
    });
}
function modalOpen(name){
	document.getElementById(name).style.display = 'block';
	document.body.style.overflow = 'hidden';
	document.getElementById(name).style.overflow = 'auto';
	document.getElementById('nav').hidden = true;
}


function modalClose(name){
	document.getElementById(name).style.display = 'none';
	document.body.style.overflow = 'scroll';	
	document.getElementById(name).style.overflow = 'hidden';
	document.getElementById('nav').hidden = false;
}