const addButton = document.getElementById('add-button');
const itemInput = document.getElementById('item-input');
const shoppingList = document.getElementById('shopping-list');
const totalSelected = document.getElementById('total-selected');

addButton.addEventListener('click', addItem);

function addItem() {
    const itemName = itemInput.value.trim();
    if (itemName !== '') {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox" class="checkbox">
            <span class="item-name">${itemName}</span>
            <div class="quantity">
                <button class="decrement"><</button>
                <span class="quantity-value">1</span>
                <button class="increment">></button>
            </div>
        `;
        shoppingList.appendChild(listItem);

        const quantityValue = listItem.querySelector('.quantity-value');
        const checkboxes = document.querySelectorAll('.checkbox');

        const decrementButton = listItem.querySelector('.decrement');
        const incrementButton = listItem.querySelector('.increment');

        let quantityEntered = false;

        decrementButton.addEventListener('click', () => {
            updateQuantityValue(quantityValue, -1);
            if (quantityEntered) {
                updateTotalSelected(checkboxes);
            }
        });

        incrementButton.addEventListener('click', () => {
            updateQuantityValue(quantityValue, 1);
            if (quantityEntered) {
                updateTotalSelected(checkboxes);
            }
        });

        quantityValue.addEventListener('input', () => {
            quantityEntered = true;
            updateTotalSelected(checkboxes);
        });

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                updateTotalSelected(checkboxes);
                if (quantityEntered) {
                    updateItemStatus(checkbox);
                }
            });
        });

        itemInput.value = '';
    }
}

function updateItemStatus(checkbox) {
    const itemName = checkbox.nextElementSibling;
    if (checkbox.checked) {
        itemName.classList.add('completed');
    } else {
        itemName.classList.remove('completed');
    }
}

function updateQuantityValue(element, amount) {
    let currentValue = parseInt(element.textContent);
    currentValue += amount;
    if (currentValue < 0) {
        currentValue = 0;
    }
    element.textContent = currentValue;
}

function updateTotalSelected() {
    let selectedItems = 0;

    const quantityValues = document.querySelectorAll('.quantity-value');
    quantityValues.forEach(quantityValue => {
        selectedItems += parseInt(quantityValue.textContent);
    });

    totalSelected.textContent = selectedItems;
}





