$(function() {

    var zoomCart = {

        viewCartBtn$: null,
        showUserBtn$: null,
        cartData: null,
        cartSubmitBtn$: null,
        searchBtn$: null,
        animCreator: null,
        manAnimCreator: null,

        init: function() {
            this.viewCartBtn$ = $('.btn-view-cart');
            this.showUserBtn$ = $('#showUserBtn');
            this.cartSubmitBtn$ = $('#submitCart');
            this.searchBtn$ = $('.btn-search');
            this.setEvents();
        },

        setEvents: function() {
            var _that = this;
            this.createAnim();
            this.viewCartBtn$.bind('click', function(event) {
                $("#cartModal").modal("show");
            });

            this.showUserBtn$.bind('click', function(event) {
                $("#user-details-panel").show();
            });

            $('#cartModal').on('show.bs.modal', function (event) {
                _that.showCartDetails();
            });

            this.cartSubmitBtn$.bind('click', function(event) {
                $("#cartModal").modal("hide");
                $("#successModal").modal("show");
            });

            this.searchBtn$.bind('click', function(event) {
                if($('#searchInput').val() == '') {
                    $(".search-error").show();
                } else {
                    $(".search-error").hide();
                }
            });
        },

        createAnim: function() {
           var animSheet = new AnimationSheet({
            imagePath: "../images/monster.png",
            width: 190,
            height: 240,
            frameSequence: [0, 1, 2, 3, 4, 5,6,7,8,9],
            timeSlice: 50
           });

           this.animCreator = new Animator({
            canvasMode: true,
            // width: 200,
            // height: 200,
            parentDom: $("#spriteAnim"),
            animSheet: [
                animSheet
            ],
            onAnimationEnd: this.onAnimationEnd.bind(this)
           });
          

           this.animCreator.start();

           var manAnimSheet = new AnimationSheet({
            imagePath: "../images/ryu-sprite-demo.png",
            width: 435,
            height: 267,
            frameSequence: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
            timeSlice: 50
           });

           this.manAnimCreator = new Animator({
            canvasMode: true,
            // width: 200,
            // height: 200,
            parentDom: $("#manAnim"),
            animSheet: [
                manAnimSheet
            ],
            onAnimationEnd: this.onManAnimEnd.bind(this)
           });

           this.manAnimCreator.start();
        },

        onAnimationEnd: function() {
            this.animCreator.start();
        },

        onManAnimEnd: function() {
            this.manAnimCreator.start();
        },

        showCartDetails: function() {
            var _that = this;
            this.cartData = [
                {
                    'productName': 'Tab',
                    'productPrice': '40.00',
                    'productQty': '1',
                    'proudctImg': 'images/bottle.png'
                },{
                    'productName': 'Photo Frame',
                    'productPrice': '800.00',
                    'productQty': '1',
                    'proudctImg': 'images/swami.png'
                },{
                    'productName': 'Yoga Mat',
                    'productPrice': '40.00',
                    'productQty': '1',
                    'proudctImg': 'images/jap-mal.png'
                }
            ];

           

            $.ajax({
                url : '',
                type : 'POST',
                data : JSON.stringify(''),
                cache : false,
                async : false,
                contentType : "application/json; charset=utf-8",
                success : function(data) {

                    var temp = JSON.parse(data);
                },

                error: function(err) {
                    console.log(err);
                },

                complete: function(data) {
                    var cartTable$ = $("#cartTable");
                    if (cartTable$ && cartTable$.length > 0) {
                        cartTable$.find('tbody').empty();
                        var tableRow = '';
                        _that.cartData.forEach(function(product, index) {
                            tableRow = '<tr>';
                          //  tableRow += '<td>'+ (index + 1) + '</td>';
                            tableRow += '<td>';
                            tableRow +=   '<div class="row">';
                            tableRow +=      '<div class="col-md-2 col-sm-2 col-2">';
                            tableRow +=        '<img class="product-image" src="'+product.proudctImg+'"/>';
                            tableRow +=      '</div>';
                            tableRow +=      '<div class="col-md-6 col-sm-6 offset-2 col-6">';
                            tableRow +=        '<h4 class="product-name ml-2">'+product.productName+'</h4>';
                            tableRow +=        '<h4 class="product-price ml-2">₹'+product.productPrice+'</h4>';
                            tableRow +=      '</div>';
                            tableRow +=   '</div>';
                            tableRow += '</td>';
                            tableRow += '<td>';
                            tableRow +=  '<div class="row">';
                            tableRow +=   '<div class="col-3">';
                            tableRow +=     '<input type="text"  class="input-qty" value="'+product.productQty+'"/>';
                            tableRow +=     '<br/> <a href="javascript:void(0);" class="updateProduct">Update</a>';
                            tableRow +=   '</div>';
                            tableRow +=   '<div class="col-2 offset-2">';
                            tableRow +=     '<div class="removeProduct mt-1"><img src="images/remove.png"/></div>';
                            tableRow +=   '</div>';
                            tableRow +=  '</div>';
                            tableRow += '</td>';
                            tableRow += '</tr>';
                            cartTable$.find('tbody').append(tableRow);
                        });
                        
                    }
                }
            });

        },
    };

    zoomCart.init();
});