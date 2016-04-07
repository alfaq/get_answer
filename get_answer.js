(function($){
    Drupal.behaviors.get_answer =  {
        attach: function (context, settings) {
            $('a.answer', context).click(function () {
                var current = $(this);
                var parent = current.closest('.all-answers');
                var id_entity = current.attr('id');
                var id_entity_a = id_entity.split('-');

                var entity_id = id_entity_a[0];
                var answer_id = id_entity_a[1];
                var correct_num = 0;
				console.log(parent.find('.incorrect-red').length);
				console.log(parent.find('.correct-green').length);
                if(parent.find('.incorrect-red').length <=0 && parent.find('.correct-green').length <=0) {
                    if (entity_id.length > 0) {
                        // Ёта функция будет выполняться после того, как ajax запрос на сервер был выполнен успешно
                        var get_correct_answer = function (data) {
                            // ѕараметр "data" является объектом JSON. —войство УproductsФ ¤вл¤етс¤ списком товаров, который возвращаетс¤ с сервера в ответ на запрос ajax.
                            //$('.title').html(data.correct_num);
                            correct_num = data.correct_num;
                            if (correct_num == answer_id) {
                                current.addClass('correct-green');
                                $('span.all-right-q').text($('span.all-right-q').text()*1 + 1);
                            } else {
                                current.addClass('incorrect-red');
                                $('#' + entity_id + '-' + correct_num, context).addClass('correct-green');
                            }
                            $('span.all-q').text($('span.all-q').text()*1 - 1);
                            if($('span.all-q').text()*1 <= 0){
                                //alert('finish test');
								//если закончили тест, то забираем количество правильных ответов из дива
								
                                var get_finish_result = function (data) {
                                    //$('.title').html();
									$('#result-test').html('<div><div class="image-field-title">'+data.title +'</div><div class="image-field-image"><img src="'+ data.img +'" /></div>'+'<div class="image-field-desc">'+data.desc+'</div></div>');
                                    //сюда нужно вернуть тайтл, картинку и описание и все!!!!
                                }
								var correct_q = $('span.all-right-q').text()*1;
                                var nid = $('span.all-q').data('nid');
                                $.ajax({
                                    type: 'POST',
                                    url: '/get/finish/'+nid+'/'+correct_q, // Which url should be handle the ajax request. This is the url defined in the <a> html tag
                                    success: get_finish_result, // The js function that will be called upon success request
                                    dataType: 'json', //define the type of data that is going to get back from the server
                                    data: 'js=1' //Pass a key/value pair
                                });
                            }
                        }
                        $.ajax({
                            type: 'POST',
                            url: this.href, // Which url should be handle the ajax request. This is the url defined in the <a> html tag
                            success: get_correct_answer, // The js function that will be called upon success request
                            dataType: 'json', //define the type of data that is going to get back from the server
                            data: 'js=1' //Pass a key/value pair
                        });
                    }
                }
                return false;  // return false so the navigation stops here and not continue to the page in the link
            });
        }
    }
})(jQuery);