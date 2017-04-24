/*
* Форма регистрации
*/
var formChecking = {
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
        this.element.formRegister = $('#register-form');
        this.element.formChangePassword = $('#change-password-form');
        this.element.formFName = $('#fname');
        this.element.formSName = $('#sname');
        this.element.formMName = $('#mname');
        this.element.formEmail = $('#email');
        this.element.formPassOld = $('#password-old');
        this.element.formPass = $('#password');
        this.element.formPassAgain = $('#password-again');
        this.element.formPhone = $('#phone');
        this.element.formGender = $('#gender');
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

        this.element.formRegister.on('submit', validateFormCallback);
        this.element.formChangePassword.on('submit', validateFormCallback);
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

        // if(!obj.isValid(obj, obj.element.formGender)) {
        //     e.preventDefault();
        // }
        if (obj.element.formRegister.length) {
            if (!obj.isValid(obj, obj.element.formFName)) {
                e.preventDefault();
            }
            if (!obj.isValid(obj, obj.element.formSName)) {
                e.preventDefault();
            }
            if (!obj.isValid(obj, obj.element.formEmail)) {
                e.preventDefault();
            }
        }
        if(!obj.isValid(obj, obj.element.formPassOld)) {
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
/*
* Личный кабинет.Редактирование личных данных.
*/
var personal = {
    init: function () {
        var _this = this;

        _this.setObjects();
        _this.setConstants();
        _this.buttonAddAvatarOperacy();
        _this.addAvatar();
    },
    setObjects: function() {
        this.element = {};
        this.element.personalPhoto = $('#personal-photo');
        this.element.addAvatar = $('#add-avatar');
    },
    setConstants: function() {
        this.const = {};
    },
    buttonAddAvatarOperacy: function () {
        var addAvatar = this.element.addAvatar;
        this.element.personalPhoto.on('mouseover', function () {
            addAvatar.css('background', '#2b5372');
        });
        this.element.personalPhoto.on('mouseout', function () {
            addAvatar.css('background', '');
        });
        this.element.personalPhoto.on('change', function () {
            console.log("Отправка аватара на бекенд и обработка");
            //Здесь будет AJAX запрос.Отправка картинки серверу, сохранение её в папке пользователя.
            //Сразу же после удачной отправки поместить это изображение в аватар.
        });
    },
    addAvatar: function () {
    }
};
/*
* Страница с продуктами.
*/
var products = {
    init: function () {
        var _this = this;

        _this.setObjects();
        _this.setConstants();
        _this.addProductCounts();
        _this.addProductToCartApi();
    },
    setObjects: function() {
        this.element = {};
        this.element.orderNumber = $('.order-number');
        this.element.addToCartButton = $('.add-to-cart-button');
        this.element.orderNumberInp = $('.order-number-inp');
    },
    setConstants: function() {
        this.const = {};
    },
    addProductCounts: function () {
        this.element.orderNumber.bind('click', function (event) {
            var elements = [$(this).find('.order-number-inp')];
            new ClassOrderNumberHelper( event, elements);
        });

        this.element.orderNumber.bind('change', function () {
            var childInput = $(this).find('.order-number-inp');
            var maxCount = childInput.attr('max');
            childInput.css('border', '');
            if (parseInt(childInput.val()) > parseInt(maxCount) || !parseInt(childInput.val())) {
                childInput.val(0)
            }
        });
    },
    addProductToCartApi: function () {
        var inp = this.element.orderNumberInp;

        this.element.addToCartButton.bind('click', function () {
            var parent = $(this).parent();
            var count = parent.find(inp).val();
            var productId = parent.find(inp).attr('data-product-id');

            var url = '/layout/add-product';
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                type: "POST",
                url: url,
                dataType: 'json',
                data: {
                    productId: productId,
                    count:     count
                },
                success: function(data) {
                    console.log(data);
                }
            });
        });
    }
};

/*
 * Корзина.
 */
var cart = {
    init: function () {
        var _this = this;

        _this.setObjects();
        _this.setConstants();
        _this.deleteProduct();
    },
    setObjects: function() {
        this.element = {};
        this.element.orderNumber = $('.order-number');
    },
    setConstants: function() {
        this.const = {};
    },
    deleteProduct: function () {
        var inp = this.element.orderNumberInp;

        this.element.addToCartButton.bind('click', function () {
            var parent = $(this).parent();
            var count = parent.find(inp).val();
            var productId = parent.find(inp).attr('data-product-id');

            var url = '/';
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                type: "POST",
                url: url,
                dataType: 'json',
                data: {

                },
                success: function(data) {
                    console.log(data);
                }
            });
        });
    }
};

$(document).ready(function() {

    formChecking.init();

    personal.init();

    products.init();

    cart.init();

});