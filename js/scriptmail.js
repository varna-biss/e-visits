"use strict"
// ------проверка существования формы------
document.addEventListener('DOMContentLoaded', function () {

  // ---при отправке формы запускаем async function formSend(e)---
  const form = document.getElementById('form');
  const overlay = document.getElementById('overlay');
  form.addEventListener('submit', formSend);


  // -----форма отправки  на почту--------
  async function formSend(e) {

    // ----запрещаем дефолтную отправку формы при нажатии на кнопку----
    e.preventDefault();

  //  --- к переменной error привязываем валидацию formValidate(form)---
    let error = formValidate(form);

    // ---вытягиваем информацию и картинку с формы-------
    let formData = new FormData(form);
    // formData.append('image', formImage.files[0]);
    // -----почта отправляется при прибавлении в форму '_sending'---
    if (error === 0) {
      form.classList.add('_sending');

      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      // --после отправки формы alert-отправлено и обнуление формы и убрать _sending----
      if (response.ok) {
        let result = await response.json();
        // alert(result.message);
        // formPreview.innerHTML = '';
        form.reset();
        form.classList.remove('_sending')
        overlay.classList.add('_send')
        // --если форма не отправлена то  alert("Ошибка") и убрать _sending---
      } else {
        alert("Ошибка");
        form.classList.remove('_sending')
      }
    } else {
      alert('Заполните обязательные поля !')
    }
  }
  // ----------конец отправки----------

// -------валидация формы---------

  function formValidate(form) {
    let error = 0;
    //--- проверка всех class-ов в Html на ._req----
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);


      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
        formAddError(input);
        error++;
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }
// -----конец валидации формы------


  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');

  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }


  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
  // const formImage = document.getElementById('formImage');
  // const formPreview = document.getElementById('formPreview');

  // formImage.addEventListener('change', () => {
  //   uploadFile(formImage.files[0]);

  // });
  // function uploadFile(file) {
  //   if (!['image/jpeg'].includes(file.type)) {
  //     alert('Разрешены только изображения!');
  //     formImage.value = '';
  //     return;
  //   }
  //   if (file.size > 2 * 1024 * 1024) {
  //     alert('Файл должен быть менее 2 МБ');
  //     return;
  //   }
  //   var reader = new FileReader();
  //   reader.onload = function (e) {
  //     formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
  //   };
  //   reader.onerror = function (e) {
  //     alert('Ошибка');
  //   };
  //   reader.readAsDataURL(file);

  // }

});