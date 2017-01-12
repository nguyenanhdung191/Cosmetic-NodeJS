let ps = [];
let currentOrderID;
let currentOrderDetailList;
const getCurrentOrder = () => {
    let HTML = "";
    $("#orderList").html("");
    $.get("/api/orders", data => {
        data.forEach(order => {
            HTML += `<div class="orderItem">
            <div class="orderIcon"><img class="icon" src="img/order.png"/></div>
            <div class="orderNo">Order số: ${order.orderID}</div>
            <div class="orderInfoContainer">
                <table>
                    <tr>
                        <td>Ngày order:</td>
                        <td>${moment(order.orderDate).format("DD/MM/YYYY HH:mm")}</td>
                    </tr>
                    <tr>
                        <td colspan="2">Tên: ${order.orderCustomerName}</td>
                    </tr>
                    <tr>
                        <td colspan="2">Số ĐT: ${order.orderPhoneNumber}</td>
                    </tr>
                    <tr>
                        <td colspan="2"><button class="button" onclick="getOrderDetail('${order.orderID}')">Xem chi tiết</button></td>
                    </tr>
                    <tr>
                        <td colspan="2"><button class="button" onclick="deleteOrder('${order.orderID}')">Xóa đơn hàng</button></td>
                    </tr>
                </table>
            </div>
        </div>`
        });
        HTML += `<div class="orderItem">
                    <img class="addOrderItemButton" onclick="addOrder()" src="img/addicon.png"/>
                 </div>`;
        $("#orderList").html(HTML);
        modal();
    });
};
const getOrderDetail = (orderID) => {
    currentOrderID = orderID;
    $("#orderDetail").show();
    let total = 0;
    $.get(`/api/orderDetails?orderID=${orderID}`, data => {
        let HTML;
        $("#orderDetailList").html(`<tr>
                                        <td class="header">Sản phẩm</td>
                                        <td class="header">Số lượng</td>
                                        <td class="header">Thành tiền</td>
                                        <td class="header"></td>
                                    </tr>`);
        data.forEach(orderdetail => {
            HTML += `<tr>
                        <td>${orderdetail.product.productName}</td>
                        <td><button orderDetailID="${orderdetail.orderDetailID}" class="quantityButton" onclick="addQuantity(this)">+</button><span>${orderdetail.quantity}</span><button orderDetailID="${orderdetail.orderDetailID}" onclick="minusQuantity(this)" class="quantityButton">&minus;</button></td>
                        <td>${(parseInt(orderdetail.quantity) * parseInt(orderdetail.product.productPrice)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                        <td><button orderDetailID="${orderdetail.orderDetailID}" class="deleteOrderDetailButton" onclick="deleteOrderDetail(this)">XÓA</button></td>
                    </tr>`;
            total += (orderdetail.product.productPrice * orderdetail.quantity);
        });
        $.get(`/api/orders?orderID=${orderID}`, order => {
            let HTML = `<tr><td><strong>Order số:</strong> ${order.orderID}</td></tr>
                    <tr><td><strong>Tên khách hàng:</strong> ${order.orderCustomerName}</td></tr>
                    <tr><td><strong>Số điện thoại:</strong> ${order.orderPhoneNumber}</td></tr>
                    <tr><td><strong>Địa chỉ giao hàng:</strong> ${order.orderAddress}</td></tr>
                    <tr><td><strong>Tổng cộng: ${(total).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</strong></td></tr>`;
            $("#orderInfo").html(HTML);
        });
        $("#orderDetailList").append(HTML);
        currentOrderDetailList = data;
    });
};
const addOrder = () => {
    let orderCustomerName = prompt("Vui lòng nhập tên khách hàng");
    let orderAddress = prompt("Vui lòng nhập địa chỉ giao hàng");
    let orderPhoneNumber = prompt("Vui lòng nhập số điện thoại");
    if (orderCustomerName == null || orderAddress == null || orderPhoneNumber == null) {

    } else {
        $.ajax({
            async: false,
            url: `/api/orders`,
            contentType: "application/json",
            data: JSON.stringify({
                orderCustomerName: orderCustomerName,
                orderAddress: orderAddress,
                orderPhoneNumber: orderPhoneNumber
            }),
            type: 'POST'
        });
        getCurrentOrder();
    }
};
const deleteOrder = (orderID) => {
    if (confirm("Bạn có chắc chắn muốn xóa order này?") == true) {
        $.ajax({
            async: false,
            url: `/api/orders`,
            contentType: "application/json",
            data: JSON.stringify({orderID: orderID}),
            type: 'DELETE'
        });
        getCurrentOrder();
    }
};
const modal = () => {
    var orderDetailModal = document.getElementById('orderDetail');
    var orderDetailButton = document.getElementsByName('orderDetailButton');
// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
// When the user clicks on the button, open the modal
    span.onclick = function () {
        orderDetailModal.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target == orderDetailModal) {
            orderDetailModal.style.display = "none";
        }
    };
};
const getMenuTree = () => {
    jQuery.ajaxSetup({async: false});
    let child = 1;
    let HTML = `<tr class="treegrid-1">
                    <td>THÊM SẢN PHẨM</td>
                </tr>`;
    $.get("/api/products", product => {
        product.forEach(p => {
            ps.push(p);
        });
    });
    $.get("/api/productTypes", productType => {
        productType.forEach(producttype => {
            child += 1;
            HTML += `<tr class="treegrid-${child} treegrid-parent-1">
                        <td>${producttype.productTypeName}</td>
                    </tr>`;
            let parent = child;
            ps.forEach(p => {
                if (p.productTypeID == producttype.productTypeID) {
                    child += 1;
                    HTML += `<tr class="treegrid-${child} treegrid-parent-${parent}">
                                <td><a id="p-${p.productID}" class="menuTreeItem" ondblclick="addProductDetail(${p.productID})" href="#">${p.productName}</a></td>
                             </tr>`;
                }
            });
        });
    });
    $("#menuTree").html(HTML);
    $(".tree").treegrid();
    $('.tree').treegrid('getRootNodes').treegrid('getChildNodes').treegrid('collapse');
    //jQuery.ajaxSetup({async: true});
};
const addProductDetail = (id) => {
    for (let i = 0; i < currentOrderDetailList.length; i++) {
        if (currentOrderDetailList[i].product.productID == id) {
            alert("Sản phẩm này đã có trong order");
            return;
        }
    }
    $.ajax({
        async: false,
        url: `/api/orderDetails`,
        contentType: "application/json",
        data: JSON.stringify({productID: id, quantity: 1, orderID: currentOrderID}),
        type: 'POST'
    });
    getOrderDetail(currentOrderID);
};
const addQuantity = (button) => {
    let orderDetailID = $(button).attr("orderDetailID");
    let quantity = parseInt($(button).next().html()) + 1;
    $.ajax({
        async: false,
        url: `/api/orderDetails`,
        contentType: "application/json",
        data: JSON.stringify({orderDetailID: orderDetailID, quantity: quantity}),
        type: 'PUT'
    });
    $(button).next().html(quantity);
    getOrderDetail(currentOrderID);

};
const minusQuantity = (button) => {
    let orderDetailID = $(button).attr("orderDetailID");
    let quantity = parseInt($(button).prev().html()) - 1;
    if (quantity == 0) {
        return;
    } else {
        $.ajax({
            async: false,
            url: `/api/orderDetails`,
            contentType: "application/json",
            data: JSON.stringify({orderDetailID: orderDetailID, quantity: quantity}),
            type: 'PUT'
        });
    }
    $(button).prev().html(quantity);
    getOrderDetail(currentOrderID);
};
const deleteOrderDetail = (button) => {
    let orderDetailID = $(button).attr("orderDetailID");
    $.ajax({
        async: false,
        url: `/api/orderDetails`,
        contentType: "application/json",
        data: JSON.stringify({orderDetailID: orderDetailID}),
        type: 'DELETE'
    });
    getOrderDetail(currentOrderID);
};

getCurrentOrder();
getMenuTree();


