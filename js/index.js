// import Cleave from "./cleave.min.js";

const $ = (e) => document.querySelector(e);

const btnNav = $(".btn_nav");
const contentLeft = $(".content_left");
btnNav.addEventListener("click", function () {
    contentLeft.classList.toggle("show_content_left");
});

function formatCurrency(num, locale = navigator.language) {
    return new Intl.NumberFormat(locale).format(num);
}
const toggleTheme = $(".toggle_theme");
const toggleThemeSun = $(".toggle_theme-sun");
const toggleThemeMoon = $(".toggle_theme-moon");
const htmlEl = $("html");
toggleTheme.addEventListener("click", (e) => {
    console.log(e.target.classList);
    function toggleDisplay(params) {
        toggleThemeSun.classList.toggle("hide");
        toggleThemeMoon.classList.toggle("hide");
    }
    if (e.target.classList.contains("toggle_theme-sun")) {
        toggleDisplay();
        htmlEl.attributes["data-bs-theme"].value = "light";
    }
    if (e.target.classList.contains("toggle_theme-moon")) {
        toggleDisplay();
        htmlEl.attributes["data-bs-theme"].value = "dark";
    }
    // e.target.closest(".toggle_theme-sun")
});

const inputChangeColor = document.querySelector(".form-range");
const root = document.querySelector(":root");
inputChangeColor.addEventListener("input", function name() {
    // console.log(inputChangeColor.value);
    root.style.setProperty("--hue", inputChangeColor.value);
});

// =================================================================================
// Bài 1: Tính điểm thi
//=================================================================================
//INPUT
const calMarksForm = $(".calMarks");
const benchMark = $(".calMarks_input-benchMark");
const selectDistrict = $(".calMarks_select-district");
const calMarksRadios = $(".calMarks_radios");
const Mark1 = $(".calMarks_input-Mark1");
const Mark2 = $(".calMarks_input-Mark2");
const Mark3 = $(".calMarks_input-Mark3");
const calMarksResult = $(".calMarks_result");

//HANDLE
function calMark() {
    const calMarksRadioEl = calMarksRadios.querySelector(
        'input[name="calMarksRadioOptions"]:checked'
    );
    const calMarksRadio = calMarksRadioEl ? calMarksRadioEl.value : "0";

    let markPrioritize = 0;
    let result = "đậu";
    if (selectDistrict.value === "A") markPrioritize = 2;
    if (selectDistrict.value === "B") markPrioritize = 1;
    if (selectDistrict.value === "C") markPrioritize = 0.5;

    if (calMarksRadio === "1") markPrioritize += 2.5;
    if (calMarksRadio === "2") markPrioritize += 1.5;
    if (calMarksRadio === "3") markPrioritize += 1;

    //nếu 1 trong 3 điểm là 0 thì rớt
    if (!+Mark1.value || !+Mark2.value || !+Mark3.value) result = "rớt";

    //nếu tổng 3 điểm và điểm ưu tiên bé hơn điểm chuẩn thì rớt
    if (+Mark1.value + +Mark2.value + +Mark3.value + +markPrioritize < benchMark.value)
        result = "rớt";

    const totalMark = +Mark1.value + +Mark2.value + +Mark3.value + +markPrioritize;
    return { totalMark, result };
}

//OUTPUT
calMarksForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const arrResult = calMark();
    calMarksResult.innerHTML = `Kết quả: <br>- Bạn đã ${arrResult.result} <br>- Tổng điểm: ${arrResult.totalMark}`;
});

// =================================================================================
// Bài 2: Tính tiền điện
//=================================================================================
//INPUT
const calElecEl = $(".calElec");
const calElecInputName = $(".calElec_input-name");
const calElecInputKw = $(".calElec_input-kw");
const calElecResult = $(".calElec_result");

//HANDLE
function calElec(kw) {
    let money;
    //50 kw đầu
    if (+kw.value <= 50) {
        money = +kw.value * 500;
    }
    //50kw kế => 100
    if (+kw.value > 50 && +kw.value <= 100) {
        money = 50 * 500;
        money += (+kw.value - 50) * 650;
    }
    //100kw kế => 200
    if (+kw.value > 100 && +kw.value <= 200) {
        money = 50 * 500;
        money += 50 * 650;
        money += (+kw.value - 100) * 850;
    }
    //150kw kế => 350
    if (+kw.value > 200 && +kw.value <= 350) {
        money = 50 * 500;
        money += 50 * 650;
        money += 100 * 850;
        money += (+kw.value - 200) * 1100;
    }
    //còn lại
    if (+kw.value > 350) {
        money = 50 * 500;
        money += 50 * 650;
        money += 100 * 850;
        money += 150 * 1100;
        money += (+kw.value - 350) * 1300;
    }
    return formatCurrency(money);
}

//OUTPUT
calElecEl.addEventListener("submit", function (e) {
    e.preventDefault();
    const result = calElec(calElecInputKw);
    calElecResult.innerHTML = `Kết quả: <br>- Họ và tên: ${calElecInputName.value} <br>- Tiền điện: ${result} VNĐ`;
});

// =================================================================================
// Bài 3: Tính thuế thu nhập cá nhân
//=================================================================================
//INPUT
const calTncnEL = $(".calTncn");
const calTncnName = $(".calTncnName");
const calTncnTotal = $(".calTncnTotal");
const calTncnPerson = $(".calTncnPerson");
const calTncnResult = $(".calTncn_result");

//HANDLE
function calTncn(data) {
    const tncnTax =
        +calTncnTotal.value.split(",").join("") - 4e6 - +calTncnPerson.value * 16e5;

    let result = 0;
    if (tncnTax <= 0) {
        return "Số tiền thu nhập không hợp lệ";
    }
    if (tncnTax > 0 && tncnTax <= 6e7) {
        result = 0.05 * tncnTax;
    }
    if (tncnTax > 6e7 && tncnTax <= 12e7) {
        result = 0.1 * tncnTax;
    }
    if (tncnTax > 12e7 && tncnTax <= 21e7) {
        result = 0.15 * tncnTax;
    }
    if (tncnTax > 21e7 && tncnTax <= 384e6) {
        result = 0.2 * tncnTax;
    }
    if (tncnTax > 384e6 && tncnTax <= 624e6) {
        result = 0.25 * tncnTax;
    }
    if (tncnTax > 624e6 && tncnTax <= 96e7) {
        result = 0.3 * tncnTax;
    }
    if (tncnTax > 96e7) {
        result = 0.35 * tncnTax;
    }
    return `${formatCurrency(result)} VNĐ`;
}

//OUTPUT
calTncnEL.addEventListener("submit", function (e) {
    e.preventDefault();
    const result = calTncn(123);
    calTncnResult.innerHTML = `Kết quả: <br>- Họ và tên: ${calTncnName.value} <br>- Tiền thuế TNCN: ${result}`;
});
new Cleave(".calTncnTotal", {
    numeral: true,
});

// =================================================================================
// Bài 4: Tính tiền cáp
//=================================================================================
//INPUT
const calCapEL = $(".calCap");
const calCapSelect = $(".calCap_select");
const calCapInputId = $(".calCap_input-id");
const calCapInputVip = $(".calCap_input-vip");
const calCapInputQuantity = $(".calCap_input-quantity");
const calCapResult = $(".calCap_result");

//HANDLE
function calCap(params) {
    let billFee, serviceFee, vipFee;
    let result = 0;
    console.log(calCapSelect.value);
    if (calCapSelect.value === "1") {
        billFee = 4.5;
        serviceFee = 20.5;
        vipFee = 7.5 * +calCapInputVip.value;
        result = billFee + serviceFee + vipFee;
    }
    if (calCapSelect.value === "2") {
        billFee = 15;
        serviceFee = 75;
        vipFee = 50 * +calCapInputVip.value;

        result = billFee + serviceFee + vipFee;
        if (+calCapInputQuantity.value > 10) {
            result += (+calCapInputQuantity.value - 10) * 5;
        }
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(result);
}

//OUTPUT
calCapEL.addEventListener("submit", (e) => {
    e.preventDefault();
    const result = calCap();
    calCapResult.innerHTML = `Kết quả: <br>- Mã khách hàng: ${calCapInputId.value} <br>- Tiền cáp: ${result}`;
});

calCapSelect.addEventListener("change", () => {
    if (calCapSelect.value === "2") {
        calCapInputQuantity.removeAttribute("disabled");
    } else {
        calCapInputQuantity.setAttribute("disabled", "");
    }
});
