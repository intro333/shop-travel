var personal = {
    init: function () {
        var _this = this;

        _this.setObjects();
        _this.setConstants();
        _this.datePicker();
        _this.mask();
        _this.setEventHandlers();
        // this.needValidateSlot = false;
    },
    setObjects: function() {
        this.element = {};
        this.element.formFName = $('#fname');
        this.element.formSName = $('#sname');
        this.element.formMName = $('#mname');
        this.element.formEmail = $('#email');
        this.element.formPass = $('#password');
        this.element.formPassAgain = $('#password-again');
        this.element.formPhone = $('#phone');
        this.element.formGender = $('#gender');
        this.element.formRegisterSubmit = $('#register-submit');
        this.element.fieldBirthdate = $('#birthdate');
        this.element.formBirthdate = $('#datetimepicker');
        this.element.blockErrors = $('.error_message');
    },
    setConstants: function() {
        this.const = {};
        this.const.dateFormatUpper = 'DD.MM.YYYY';
        this.const.dateFormatLower = 'dd.mm.yyyy';
        this.const.dateMask = '?99.99.9999';
        this.const.phoneMask = '+7 (999) 999 99 99';
        this.const.defaultSelectValue = 'NO';
    },
    setEventHandlers: function() {
        var validateFormCallback = Function.createCallback(this.validateForm, this);

        this.element.formRegisterSubmit.on('click', validateFormCallback);
    },
    datePicker: function() {
        this.element.formBirthdate.datepicker({
            format: this.dateFormatLower,
            endDate: '-1d',
            keepEmptyValues: true,
            autoclose: true,
            forceParse: false,
            language: 'ru'
        });
    },
    mask: function() {
        this.element.fieldBirthdate.mask(this.const.dateMask);
        this.element.formPhone.mask(this.const.phoneMask);
    },
    clearErrorMessage: function(obj) {
        obj.element.blockErrors.hide();
    },
    showErrorMessage: function(obj) {
        obj.element.blockErrors.show();
    },
    clearFieldError: function(obj) {
        obj.css('border', '');
    },
    markFieldError: function(obj) {
        obj.css('border', 'solid red 1px');
    },
    validateForm: function(e, obj) {

        if(!obj.isValid(obj, obj.element.formGender)) {
            e.preventDefault();
        }
        if(!obj.isValid(obj, obj.element.formFName)) {
            e.preventDefault();
        }
        if(!obj.isValid(obj, obj.element.formSName)) {
            e.preventDefault();
        }
        if(!obj.isValid(obj, obj.element.formEmail)) {
            e.preventDefault();
        }
        if(!obj.isValid(obj, obj.element.formPass)) {
            e.preventDefault();
        }
        if(!obj.isValid(obj, obj.element.formPassAgain)) {
            e.preventDefault();
        }
    },
    isValid: function(obj, field) {
        if (field.val() === obj.const.defaultSelectValue) {
            obj.markFieldError(field);
            obj.showErrorMessage(obj);
            field.on('change', function () {
                obj.clearFieldError(field);
                obj.clearErrorMessage(obj);
            });
            return false;
        }
        console.log(field);
        if (field.val() === '') {
            obj.markFieldError(field);
            obj.showErrorMessage(obj);
            field.on('focus', function () {
                obj.clearFieldError(field);
                obj.clearErrorMessage(obj);
            });
            return false;
        }
        return true;
    }
};

$(document).ready(function() {
    personal.init();
});