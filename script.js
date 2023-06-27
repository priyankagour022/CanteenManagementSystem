document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');
    const orderTable = document.getElementById('orderTable');
    const totalSpan = document.getElementById('total');
    const payButton = document.getElementById('payButton');
  
    let orderDetails = [];
  
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const itemName = document.getElementById('itemName').value;
      const quantity = parseInt(document.getElementById('quantity').value);
  
      if (itemName && quantity) {
        const item = {
          itemName,
          quantity,
          price: getItemPrice(itemName)
        };
  
        orderDetails.push(item);
        renderOrderDetails();
        calculateTotal();
      }
  
      // Reset form values
      orderForm.reset();
    });
  
    payButton.addEventListener('click', () => {
      // Handle payment and placing order
      // You can add the necessary logic here
      // For now, we will just console.log the order details
      console.log(orderDetails);
    });
  
    function getItemPrice(itemName) {
      // Retrieve the price based on the selected item name
      // Add the necessary logic here to fetch the price from your database or hardcode it
      switch (itemName) {
        case 'Alu Paratha':
          return 50;
        case 'Chole Bhature':
          return 100;
        case 'Dahi Puri':
          return 50;
        case 'Dosa':
          return 50;
        case 'Idle':
          return 30;
        default:
          return 0;
      }
    }
  
    function renderOrderDetails() {
      // Clear existing table rows
      while (orderTable.rows.length > 1) {
        orderTable.deleteRow(1);
      }
  
      // Render new table rows with order details
      orderDetails.forEach((item) => {
        const row = orderTable.insertRow();
        const itemNameCell = row.insertCell();
        const quantityCell = row.insertCell();
        const priceCell = row.insertCell();
  
        itemNameCell.textContent = item.itemName;
        quantityCell.textContent = item.quantity;
        priceCell.textContent = item.price;
      });
    }
  
    function calculateTotal() {
      let total = 0;
      orderDetails.forEach((item) => {
        total += item.quantity * item.price;
      });
  
      totalSpan.textContent = total;
    }
  });
  