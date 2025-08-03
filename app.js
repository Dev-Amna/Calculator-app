    document.addEventListener('DOMContentLoaded', () => {
      const screen = document.getElementById('screen');
      const btns = document.querySelectorAll('.btn');
      const themeBtn = document.getElementById('themeBtn');
      const toggle = document.querySelector('.toggle-btn');
      const body = document.body;
      
      let current = '0';
      let prev = '';
      let op = null;
      let reset = false;
      let theme = 1;
      
      function update() {
        screen.textContent = current;
      }
      
      function numInput(num) {
        if (current === '0' || reset) {
          current = num;
          reset = false;
        } else {
          current += num;
        }
        update();
      }
      
      function decimal() {
        if (reset) {
          current = '0.';
          reset = false;
          update();
          return;
        }
        
        if (!current.includes('.')) {
          current += '.';
          update();
        }
      }
      
      function setOp(newOp) {
        if (op !== null) calc();
        prev = current;
        op = newOp;
        reset = true;
      }
      
      function calc() {
        let result;
        const a = parseFloat(prev);
        const b = parseFloat(current);
        
        if (isNaN(a) || isNaN(b)) return;
        
        switch (op) {
          case '+': result = a + b; break;
          case '-': result = a - b; break;
          case '×': result = a * b; break;
          case '/': result = a / b; break;
          default: return;
        }
        
        current = result.toString();
        op = null;
        update();
      }
      
      function resetCalc() {
        current = '0';
        prev = '';
        op = null;
        update();
      }
      
      function del() {
        if (current.length === 1 || (current.length === 2 && current.startsWith('-'))) {
          current = '0';
        } else {
          current = current.slice(0, -1);
        }
        update();
      }
      
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          if (btn.classList.contains('num')) {
            numInput(btn.textContent);
          } else if (btn.classList.contains('op')) {
            if (btn.textContent === '.') {
              decimal();
            } else {
              setOp(btn.textContent);
            }
          } else if (btn.classList.contains('eq')) {
            calc();
          } else if (btn.classList.contains('clear')) {
            resetCalc();
          } else if (btn.classList.contains('del')) {
            del();
          }
        });
      });
      
      themeBtn.addEventListener('click', () => {
        theme = theme % 3 + 1;
        
        body.classList.remove('t1', 't2', 't3');
        body.classList.add(`t${theme}`);
        
        if (theme === 1) {
          toggle.style.transform = 'translateX(0)';
        } else if (theme === 2) {
          toggle.style.transform = 'translateX(25px)';
        } else {
          toggle.style.transform = 'translateX(50px)';
        }
      });
      
      update();
    });