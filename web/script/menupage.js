const addMenuItem = () => {
    if (validate() == false) {
        return;
    }
    if ($("#inputProductImage").val() != "") {
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
    }
    let name = $("#inputProductName").val();
    let description = $("#inputProductDescription").val();
    let price = $("#inputProductPrice").val();
    let typeID = $("#inputProductTypeSelector").val();
    let imageUrl = $("#inputProductImage").val().split(/(\\|\/)/g).pop();
    $.ajax({
        async: false,
        url: `product?action=addMenuItem&name=${name}&description=${description}&price=${price}&typeID=${typeID}&imageUrl=${imageUrl}`,
        cache: false,
        contentType: false,
        processData: false,
        type: 'GET'
    });

    alert("Thêm thực đơn thành công");
    clear();
    getAllProduct();

};
const removeProduct = (id, imageUrl) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?\rThao tác này không thể hoàn lại") == true) {
        $.ajax({
            async: false,
            url: `product?action=removeProduct&id=${id}&imageUrl=${imageUrl}`,
            cache: false,
            contentType: false,
            processData: false,
            type: 'GET'
        });
        alert("Xóa thực đơn thành công");
        getAllProduct();
    }
};
const editProduct = () => {
    let id = $("#inputProductID").text();
    let name = $("#inputProductName").val();
    let description = $("#inputProductDescription").val();
    let price = $("#inputProductPrice").val();
    let typeID = $("#inputProductTypeSelector").val();
    let imageUrl = $("#inputProductImage").val().split(/(\\|\/)/g).pop();
    if (imageUrl != "") {
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
    }
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
const showEditProductModal = (id,name,description,price,imageUrl,typeID) => {
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
const getAllProductType = () => {
    let HTML = "";
    $("#inputProductTypeSelector").html("");
    $.get("productType?action=getAll", data => {
        data.producttypes.forEach(producttype => {
            HTML += `<option value="${producttype.id}">${producttype.name}`;
        });

        $("#inputProductTypeSelector").html(HTML);
    });
};
const validate = () => {
    let name = $("#inputProductName").val();
    let description = $("#inputProductDescription").val();
    let price = $("#inputProductPrice").val();
    if ($("#inputProductImage").val() != ""){
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
const getAllProduct = () => {
    let HTML = "";
    $("#menuList").html("");
    $.get("product?action=viewAll", data => {
        data.products.forEach(product => {
            HTML += `<div class="menuItem">
                        <div class="productImage"><img src="img/product/${product.imageUrl}" alt="Chưa có hình"/></div>
                        <div class="productName">${product.name}</div>
                        <div class="productDescription">${product.description}</div>
                        <div class="productPrice">${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</div>
                        <div class="productOperation">
                            <img class="removeButton" onclick="removeProduct('${product.id}','${product.imageUrl}')" src="img/removeicon.png"/>
                            <img class="editButton" onclick="showEditProductModal('${product.id}','${product.name}','${product.description}','${product.price}','${product.imageUrl}','${product.typeID}')" src="img/editicon.png"/>
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
getAllProduct();

