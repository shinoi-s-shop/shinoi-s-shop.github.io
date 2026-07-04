function trackOrder() {

    let orderId = document.getElementById("orderId").value.trim();

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    let order = orders.find(item => item.id === orderId);

    if (!order) {
        alert("Order not found!");
        return;
    }

    document.getElementById("result").style.display = "block";

    document.getElementById("showId").innerText = order.id;
    document.getElementById("showStatus").innerText = order.status;

    let color = "orange";

    if (order.status === "Processing") color = "blue";
    if (order.status === "Shipped") color = "purple";
    if (order.status === "Delivered") color = "green";
    if (order.status === "Cancelled") color = "red";

    document.getElementById("showStatus").style.color = color;
}