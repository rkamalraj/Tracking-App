// Table creation automatically done by the spring boot entity class



================================================================================



// below query is for creating procedure like fake data of 2 years of weight





**DELIMITER $$**



**CREATE PROCEDURE insert\_progressive\_weights()**

**BEGIN**

  **DECLARE d DATE;**

  **DECLARE w DECIMAL(5,2);**



  **SET d = '2024-01-01';**

  **SET w = 70.0; -- starting weight**



  **WHILE d <= '2025-09-15' DO**

    **-- small daily fluctuation ±0.5**

    **SET w = w + (RAND() - 0.5) \* 1.0;**



    **-- weekly progressive increase ~0.15 kg**

    **IF DAYOFWEEK(d) = 2 THEN -- every Monday**

      **SET w = w + 0.15;**

    **END IF;**



    **-- Insert row**

    **INSERT INTO weights (user\_id, weight, recorded\_at)**

    **VALUES (1, ROUND(w, 1), d);**



    **-- Move to next day**

    **SET d = DATE\_ADD(d, INTERVAL 1 DAY);**

  **END WHILE;**

**END$$**



**DELIMITER ;**



**-- Clear old data and call it once**

**TRUNCATE TABLE weights;**

**CALL insert\_progressive\_weights();**







=========================================================================================

// if you already created procedure then only need to call this statement



**CALL insert\_progressive\_weights();**



=========================================================================================



// 1. Last Week (Mon → Sun)





**SELECT \***

**FROM weights**

**WHERE recorded\_at >= DATE\_SUB(CURDATE(), INTERVAL 7 DAY)**

**ORDER BY recorded\_at ASC;**





&nbsp;	-> Returns all rows from the last 7 days.



&nbsp;	-> Use for your week view.



=========================================================================================



// 2. Current Month





**SELECT \***

**FROM weights**

**WHERE YEAR(recorded\_at) = YEAR(CURDATE())**

  **AND MONTH(recorded\_at) = MONTH(CURDATE())**

**ORDER BY recorded\_at ASC;**



===============================================================================================



// 3. Last 3 Months (Month-End Weights)





**SELECT**

    **DATE\_FORMAT(recorded\_at, '%Y-%m') AS month,**

    **weight,**

    **recorded\_at**

**FROM weights w1**

**WHERE recorded\_at = (**

    **SELECT MAX(recorded\_at)**

    **FROM weights w2**

    **WHERE YEAR(w2.recorded\_at) = YEAR(w1.recorded\_at)**

      **AND MONTH(w2.recorded\_at) = MONTH(w1.recorded\_at)**

**)**

**AND recorded\_at >= DATE\_SUB(CURDATE(), INTERVAL 3 MONTH)**

**ORDER BY recorded\_at;**





&nbsp;	-> Returns one row per month (last weight in that month).



&nbsp;	-> For 3-month bar view.



=====================================================================================================



// 4. Current Year (Month-End Weights)





**SELECT**

    **DATE\_FORMAT(recorded\_at, '%Y-%m') AS month,**

    **weight,**

    **recorded\_at**

**FROM weights w1**

**WHERE recorded\_at = (**

    **SELECT MAX(recorded\_at)**

    **FROM weights w2**

    **WHERE YEAR(w2.recorded\_at) = YEAR(w1.recorded\_at)**

      **AND MONTH(w2.recorded\_at) = MONTH(w1.recorded\_at)**

**)**

**AND YEAR(recorded\_at) = YEAR(CURDATE())**

**ORDER BY recorded\_at;**





&nbsp;	-> Returns 12 bars (Jan → Dec) with month-end weight.

&nbsp;	

&nbsp;	-> For your year view.



========================================================================================================



// 5. All Years (Year-End Weights)





**SELECT**

    **YEAR(recorded\_at) AS year,**

    **weight,**

    **recorded\_at**

**FROM weights w1**

**WHERE recorded\_at = (**

    **SELECT MAX(recorded\_at)**

    **FROM weights w2**

    **WHERE YEAR(w2.recorded\_at) = YEAR(w1.recorded\_at)**

**)**

**ORDER BY year;**





&nbsp;       -> Returns one bar per year, last weight in that year.



&nbsp;       -> For your all years view.



=====================================================================================================================



\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

// This is for **"reference only"** no need to create table by our own in workbench



CREATE TABLE weights (

&nbsp;   id BIGINT AUTO\_INCREMENT PRIMARY KEY,

&nbsp;   user\_id BIGINT NOT NULL, -- if you want multi-user support

&nbsp;   weight DECIMAL(5,2) NOT NULL,

&nbsp;   recorded\_at DATETIME DEFAULT CURRENT\_TIMESTAMP

);



\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

