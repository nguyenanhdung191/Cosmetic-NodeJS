const getAllProduct = () => {
    let HTML = "";
    $("#menuList").html("");
    $.get("api/products", data => {
        data.forEach(product => {
            HTML += `<div class="menuItem">
                        <div class="productImage"><img src="img/product/${product.productImageUrl}" alt="Chưa có hình"/></div>
                        <div class="productName">${product.productName}</div>
                        <div class="productDescription">${product.productDescription}</div>
                        <div class="productPrice">${product.productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</div>
                        <div class="productOperation">
                            <img class="removeButton" onclick="removeProduct('${product.productID}','${product.productImageUrl}')" src="img/removeicon.png"/>
                            <img class="editButton" onclick="showEditProductModal('${product.productID}','${product.productName}','${product.productDescription}','${product.productPrice}','${product.productImageUrl}','${product.productTypeID}')" src="img/editicon.png"/>
                        </div>
                    </div>`;
        });
        HTML += `<div class="menuItem">
                    <div class="addIconButton"><img id="addMenuItemButton" class="addButton" src="img/addicon.png"/></div>
                 </div>`;
        $("#menuList").html(HTML);
        modal();
    });
};
const getAllProductType = () => {
    let HTML = "";
    $("#inputProductTypeSelector").html("");
    $.get("/api/productTypes", data => {
        data.forEach(producttype => {
            HTML += `<option value="${producttype.productTypeID}">${producttype.productTypeName}`;
        });

        $("#inputProductTypeSelector").html(HTML);
    });
};
const showEditProductModal = (id, name, description, price, imageUrl, typeID) => {
    var modal = document.getElementById('addMenuItem');
    modal.style.display = "block";
    $("#inputProductName").val(name);
    $("#inputProductDescription").val(description);
    $("#inputProductPrice").val(price);
    $("#inputProductTypeSelector").val(typeID);
    $("#inputProductID").text(id);
    $("#inputProductImage").val("");
    $("#modalTitle").text("SỬA SẢN PHẨM");
    $("#editButton").show();
    $("#addButton").hide();
};
const editProduct = () => {
    let id = $("#inputProductID").text();
    let name = $("#inputProductName").val();
    let description = $("#inputProductDescription").val();
    let price = $("#inputProductPrice").val();
    let typeID = $("#inputProductTypeSelector").val();
    let imageUrl = $("#inputProductImage").val().split(/(\\|\/)/g).pop();
    /*if (imageUrl != "") {
     var fileData = $("#inputProductImage").prop("files")[0];
     var formData = new FormData();
     formData.append("file", fileData);
     $.ajax({
     async: false,
     url: "productImage",
     dataType: 'script',
     cache: false,
     contentType: false,
     processData: false,
     data: formData,
     type: 'POST'
     })
     }*/
    $.ajax({
        async: false,
        url: `product?action=editProduct&id=${id}&name=${name}&description=${description}&price=${price}&typeID=${typeID}&imageUrl=${imageUrl}`,
        cache: false,
        contentType: false,
        processData: false,
        type: 'GET'
    });

    alert("Sửa thành công");
    $("#addMenuItem").hide();
    getAllProduct();
};
const removeProduct = (id, imageUrl) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?\rThao tác này không thể hoàn lại") == true) {
        $.ajax({
            async: false,
            url: `/api/products`,
            contentType: "application/json",
            data: JSON.stringify({
                productID: id
            }),
            type: 'DELETE'
        });
        alert("Xóa sản phẩm thành công");
        getAllProduct();
    }
};
const addProduct = () => {
    if (validate() == false) {
        return;
    }
    if ($("#inputProductImage").val() != "") {
        var fileData = $("#inputProductImage").prop("files")[0];
        var formData = new FormData();
        formData.append("file", fileData);
        $.ajax({
            async: false,
            url: "/api/productImage",
            dataType: 'script',
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            type: 'POST'
        })
    }
    let productName = $("#inputProductName").val();
    let productDescription = $("#inputProductDescription").val();
    let productPrice = $("#inputProductPrice").val();
    let productTypeID = $("#inputProductTypeSelector").val();
    let productImageUrl = $("#inputProductImage").val().split(/(\\|\/)/g).pop();
    $.ajax({
        async: false,
        url: `/api/products`,
        contentType: "application/json",
        data: JSON.stringify({
            productName: productName,
            productDescription: productDescription,
            productPrice: productPrice,
            productTypeID: productTypeID,
            productImageUrl: productImageUrl
        }),
        type: 'POST'
    });
    clear();
    alert("Thêm sản phẩm thành công");
    getAllProduct();

};
const modal = () => {
    var modal = document.getElementById('addMenuItem');
    var btn = document.getElementById('addMenuItemButton');
// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
// When the user clicks on the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
        $("#editButton").hide();
        $("#addButton").show();
        $("#modalTitle").text("THÊM SẢN PHẨM");
        clear();
    };
    span.onclick = function () {
        modal.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
    getAllProductType();
};
const validate = () => {
    let name = $("#inputProductName").val();
    let description = $("#inputProductDescription").val();
    let price = $("#inputProductPrice").val();
    if ($("#inputProductImage").val() != "") {
        let extension = $("#inputProductImage").val().match(/[^.]+$/).pop().toLowerCase();
        if (extension == "jpg" || extension == "png" || extension == "jpeg") {
        }
        else {
            alert("Hình không đúng định dạng");
            return false;
        }
    }
    if (name == "" || description == "" || price == "") {
        alert("Không được để trống tên hoặc mô tả hoặc giá");
        return false;
    }
    if (parseInt(price) < 0) {
        alert("Giá không hợp lệ");
        return false;
    }
    return true;
};
const clear = () => {
    $("#inputProductName").val("");
    $("#inputProductDescription").val("");
    $("#inputProductPrice").val("");
    $("#inputProductImage").val("");
};

getAllProduct();