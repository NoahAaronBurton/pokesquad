<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
    <h1></h1>
    
    <label for="stat1">Stat 1:</label>
    <input type="number" id="stat1" value="0"><br>
    
    <label for="stat2">Stat 2:</label>
    <input type="number" id="stat2" value="0"><br>
    
    <label for="stat3">Stat 3:</label>
    <input type="number" id="stat3" value="0"><br>
    
    <label for="stat4">Stat 4:</label>
    <input type="number" id="stat4" value="0"><br>
    
    <label for="stat5">Stat 5:</label>
    <input type="number" id="stat5" value="0"><br>
    
    <label for="stat6">Stat 6:</label>
    <input type="number" id="stat6" value="0"><br> 
    
    <button onclick="calculateTotal()">Calculate Total</button>
    
    <p>Total Stats: <span id="total">0</span></p>

    <script>
        function calculateTotal() {
            // Get values of all 6 stats
            const stat1 = parseFloat(document.getElementById('stat1').value);
            const stat2 = parseFloat(document.getElementById('stat2').value);
            const stat3 = parseFloat(document.getElementById('stat3').value);
            const stat4 = parseFloat(document.getElementById('stat4').value);
            const stat5 = parseFloat(document.getElementById('stat5').value);
            const stat6 = parseFloat(document.getElementById('stat6').value);

            // Calculate the total
            const total = stat1 + stat2 + stat3 + stat4 + stat5 + stat6;

            // Display the total
            document.getElementById('total').textContent = total;
        }
    </script>
</body>
</html>
