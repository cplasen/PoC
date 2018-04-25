var videoObj    = { "video": true },
    errBack        = function(error){
        // alert("Error Capturando el video: ", error.code);
    };

// Pedir permisos al Navegador para usar la Webcam
if(navigator.getUserMedia){                    // Standard
    navigator.getUserMedia(videoObj, iniciarWebcam, errBack);
}else if(navigator.webkitGetUserMedia){        // WebKit
    navigator.webkitGetUserMedia(videoObj, iniciarWebcam, errBack);
}else if(navigator.mozGetUserMedia){        // Firefox
    navigator.mozGetUserMedia(videoObj, iniciarWebcam, errBack);
};

function iniciarWebcam(stream){

    var miCameraOnline    = getElementById('miCameraOnline'),
        video            = miCameraOnline.querySelectorAll('video'),
        canvas            = miCameraOnline.querySelectorAll('canvas');

    video.width = video.offsetWidth;

    if(navigator.getUserMedia){                    // Standard
        video.src = stream;
        video.play();
    }else if(navigator.webkitGetUserMedia){        // WebKit
        video.src = ndow.webkitURL.createObjectURL(stream);
        video.play();
    }else if(navigator.mozGetUserMedia){        // Firefox
        video.src = window.URL.createObjectURL(stream);
        video.play();
    };

    // Click para hacer la foto
    $('#webcam-popup .takephoto').click(function(){
        // Copiando la imagen a un canvas temporal
        var temp = document.createElement('canvas');

        temp.width  = video.offsetWidth;
        temp.height = video.offsetHeight;

        var tempcontext = temp.getContext("2d"),
            tempScale = (temp.height/temp.width);

        temp.drawImage(
            video,
            0, 0,
            video.offsetWidth, video.offsetHeight
        );

        // Redimensionar al tamaño de nuestro cavas
        canvas.style.height    = parseInt( canvas.offsetWidth * tempScale );
        canvas.width        = canvas.offsetWidth;
        canvas.height        = canvas.offsetHeight;
        var context        = canvas.getContext("2d"),
            scale        = canvas.width/temp.width;
        context.scale(scale, scale);
        context.drawImage(bigimage, 0, 0);
    });
};