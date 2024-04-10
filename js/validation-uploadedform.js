import {sendData} from './api.js';
import {imgUploadForm, hashtagsInput, commentsInput, SubmitButtonText} from './const.js';
import {disabledButton, enabledButton, templateSuccess, templateError } from './loading-modal.js';
import {closeFormUpload} from './upload-photo-form.js';
import {appendNotification} from './notification.js';

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  errorClass: 'img-upload__field-wrapper--error', // Класс, обозначающий невалидное поле
  // successClass: '', // Не указываем класс
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'div', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'pristine-error' // Класс для элемента с текстом ошибки
});

const errorMessage = 'Хэштег начинается с символа # и должна состоять из букв и чисел ';
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const hashtagsValidator = (value) =>{
  const hashtags = value.trim().split(/\s+/);
  const uniqueHashtags = new Set(hashtags);

  if (uniqueHashtags.size > 5) {
    return false;
  }

  if (hashtags.length !== uniqueHashtags.size) {
    return false;
  }

  return hashtags.every((tag) => re.test(tag));
};

const message = 'Длина комментария не должна превышать 140 символов';

const commenstValidator = () =>{
  const commentsLength = commentsInput.value.trim();
  if (commentsLength.length < 140) {
    return message;
  }
};

pristine.addValidator(hashtagsInput, hashtagsValidator, errorMessage);
pristine.addValidator(commentsInput, commenstValidator, message);


const sendFormData = (formElement) => {
  const isValide = pristine.validate();

  if(isValide){
    disabledButton(SubmitButtonText.SENDING);
    sendData (new FormData(formElement));
    enabledButton(SubmitButtonText.IDLE);
    appendNotification(templateSuccess, () => closeFormUpload(imgUploadForm));
  } else {
    appendNotification(templateError);
  }
};

export {sendFormData};
