let ps = [];
let currentOrderID;
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
                        <td>Trạng thái:</td>
                        <td>Chưa giao</td>
                    </tr>
                    <tr>
                        <td colspan="2"></td>
                    </tr>
                    <tr>
                        <td colspan="2"><button class="button" onclick="getOrderDetail('${order.orderID}')">Xem chi tiết</button></td>
                    </tr>
                    <tr>
                        <td colspan="2"><button class="button">In phiếu bếp</button></td>
                    </tr>
                    <tr>
                        <td colspan="2"><button class="button">In tạm tính</button></td>
                    </tr>
                    <tr>
                        <td colspan="2"><button class="button">In bill</button></td>
                    </tr>
                </table>
            </div>
        </div>`
        });
        HTML += `<div class="orderItem">
                    <img class="addOrderItemButton" onclick="addOrderItem()" src="img/addicon.png"/>
                 </div>`;
        $("#orderList").html(HTML);
        modal();
    });
};
const getOrderDetail = (orderID) => {
    currentOrderID = orderID;
    $("#orderDetail").show();
    $.get(`/api/orderDetails?orderID=${orderID}`, data => {
        let HTML;
        $("#orderDetailList").html(`<tr>
                                        <td class="header">Món</td>
                                        <td class="header">Số lượng</td>
                                        <td class="header">Thành tiền</td>
                                        <td class="header" colspan="3">Thao tác</td>
                                    </tr>`);
        data.forEach(orderdetail => {
            HTML += `<tr>
                        <td>${orderdetail.productName}</td>
                        <td>${orderdetail.quantity}</td>
                        <td>${parseInt(orderdetail.quantity) * parseInt(orderdetail.productPrice)}</td>
                        <td>Thêm</td>
                        <td>Sửa</td>
                        <td>Xóa</td>
                    </tr>`;
        });
        $("#orderDetailList").append(HTML);
    });
};
const addOrderItem = () => {
    let orderCustomerName = prompt("Vui lòng nhập tên khách hàng");
    let orderAddress = prompt("Vui lòng nhập địa chỉ giao hàng");
    let orderPhoneNumber = prompt("Vui lòng nhập số điện thoại");

    if (orderCustomerName == "" || orderAddress == "" || orderPhoneNumber == "") {
        return;
    }
    $.ajax({
        async: false,
        url: `order?action=addOrderItem&orderCustomerName=${orderCustomerName}&orderAddress=${orderAddress}&orderPhoneNumber=${orderPhoneNumber}`,
        cache: false,
        contentType: false,
        processData: false,
        type: 'GET'
    });
    getCurrentOrder();
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
                    <td>SẢN PHẨM</td>
                </tr>`;
    $.get("product?action=viewAll", product => {
        product.products.forEach(p => {
            ps.push(p);
        });
    });
    $.get("productType?action=getAll", productType => {
        productType.producttypes.forEach(producttype => {
            child += 1;
            HTML += `<tr class="treegrid-${child} treegrid-parent-1">
                        <td>${producttype.name}</td>
                    </tr>`;
            let parent = child;
            ps.forEach(p => {
                if (p.typeID == producttype.id) {
                    child += 1;
                    HTML += `<tr class="treegrid-${child} treegrid-parent-${parent}">
                                <td><a id="p-${p.id}" class="menuTreeItem" ondblclick="addProductDetail(this.id)" href="#">${p.name}</a></td>
                             </tr>`;
                }
            });
        });
    });
    $("#menuTree").html(HTML);
    $(".tree").treegrid();
    $('.tree').treegrid('getRootNodes').treegrid('getChildNodes').treegrid('collapse');
    jQuery.ajaxSetup({async: true});
};
const addProductDetail = (id) => {
    let productID = id.split("-")[1];
    $.ajax({
        async: false,
        url: `orderDetail?action=addOrderDetail&orderID=${currentOrderID}&productID=${productID}&quantity=1`,
        cache: false,
        contentType: false,
        processData: false,
        type: 'GET'
    });
    getOrderDetail(currentOrderID);
};
getCurrentOrder();
//getMenuTree();


