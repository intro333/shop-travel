var ClassOrderNumberHelper = function( event, elementsArray ) {
    var eventTarget = event.target.classList[1];
    var elements = elementsArray;
    var maxCount = 99;

    $.each(elements, function( index, value ) {
        if (eventTarget == 'plus') {
            if (parse(value) >= maxCount) {} else {
                value.css('border', '');
                value.val(parse(value) + 1)
            }
        } else if (eventTarget == 'minus') {
            if(parse(value) <= 0) {
                value.css('border', '2px solid red');
            } else {
                value.css('border', '');
                value.val(parse(value) - 1)
            }
        }
    });

    function parse (param) {
        return parseInt(param.val());
    }
};