SELECT *
FROM   tab;

drop TABLE item_info purge;
CREATE TABLE item_info(item_code VARCHAR2(10)
                      ,item_name VARCHAR2(100)
                      ,item_spce VARCHAR2(50)
                      ,receipt_price NUMBER
                      ,sale_price NUMBER);
-- 문구 : 필기류(A), 사무용품(B), 파일/바인더(C) 
INSERT INTO item_info
VALUES
    ('A0001'
    ,'키친보드마카'
    ,'모나미 0.5'
    ,1000
    ,2000);
INSERT INTO item_info
VALUES
    ('A0002'
    ,'가든보드마카'
    ,'모나미 1.0'
    ,1300
    ,2600);
INSERT INTO item_info
VALUES
    ('A0003'
    ,'타일보드마카'
    ,'모나미 1.5'
    ,1500
    ,3000);
INSERT INTO item_info
VALUES
    ('B0001'
    ,'캠퍼스바인더노트2000'
    ,'바인더노트 2000'
    ,2000
    ,3000);
INSERT INTO item_info
VALUES
    ('B0002'
    ,'캠퍼스바인터노트3000'
    ,'바인터노트 3000'
    ,2300
    ,4000);
INSERT INTO item_info
VALUES
    ('B0003'
    ,'캠퍼스스마트링노트3호'
    ,'스마트링노트 3000'
    ,3500
    ,5000);
INSERT INTO item_info
VALUES
    ('B0004'
    ,'캠퍼스스마트링노트4호'
    ,'스마트링노트 4000'
    ,3800
    ,6000);

SELECT *
FROM   receipt_info;
drop TABLE receipt_info purge;
CREATE TABLE receipt_info(receipt_no VARCHAR2(10)
                         ,receipt_vendor VARCHAR2(10)
                         ,receipt_item VARCHAR2(10)
                         ,receipt_qty NUMBER
                         ,receipt_price NUMBER
                         ,receipt_amount NUMBER
                         ,receipt_sub VARCHAR2(10)
                         ,receipt_date DATE
                         ,receipt_flag CHAR(1));
INSERT INTO receipt_info
VALUES
    ('P201905001'
    ,'VENDER0001'
    ,'A0001'
    ,10
    ,1000
    ,10000
    ,'AAA'
    ,SYSDATE);
INSERT INTO receipt_info
VALUES
    ('P201904001'
    ,'VENDER0001'
    ,'A0001'
    ,10
    ,1000
    ,10000
    ,'AAA'
    ,SYSDATE);
INSERT INTO receipt_info
VALUES
    ('P201905001'
    ,'VENDER0001'
    ,'A0002'
    ,10
    ,1300
    ,'AAA'
    ,SYSDATE);
INSERT INTO receipt_info
VALUES
    ('P201905001'
    ,'VENDER0001'
    ,'A0003'
    ,20
    ,1500
    ,'AAA'
    ,SYSDATE);

drop TABLE issue_info;
CREATE TABLE issue_info(issue_no VARCHAR2(10)
                       ,issue_vendor VARCHAR2(10)
                       ,issue_item VARCHAR2(10)
                       ,issue_qty NUMBER
                       ,issue_amount NUMBER
                       ,issue_sub VARCHAR2(10));
INSERT INTO issue_info
VALUES
    ('S201905001'
    ,'VENDER0002'
    ,'A0001'
    ,1000
    ,5
    ,'AAA');
INSERT INTO issue_info
VALUES
    ('S201905001'
    ,'VENDER0002'
    ,'A0002'
    ,1300
    ,8
    ,'AAA');
INSERT INTO issue_info
VALUES
    ('S201905001'
    ,'VENDER0002'
    ,'A0003'
    ,1500
    ,10
    ,'AAA');

SELECT *
FROM   receipt_issue_txn
ORDER  BY 1;
drop TABLE receipt_issue_txn;
CREATE TABLE receipt_issue_txn(seq_id NUMBER
                              ,item_code VARCHAR2(10)
                              ,txn_quantity NUMBER
                              ,txn_sub VARCHAR2(10)
                              ,txn_date DATE
                              ,receipt_issue_no VARCHAR2(10));
INSERT INTO receipt_issue_txn
VALUES
    ('A0001'
    ,13
    ,'AAA'
    ,SYSDATE
    ,'P201905001');
INSERT INTO receipt_issue_txn
VALUES
    ('A0002'
    ,13
    ,'AAA'
    ,SYSDATE
    ,'P201905001');
INSERT INTO receipt_issue_txn
VALUES
    ('A0003'
    ,13
    ,'AAA'
    ,SYSDATE
    ,'P201905001');
INSERT INTO receipt_issue_txn
VALUES
    ('A0001'
    ,5
    ,'AAA'
    ,SYSDATE
    ,'S201905001');
INSERT INTO receipt_issue_txn
VALUES
    ('A0002'
    ,5
    ,'AAA'
    ,SYSDATE
    ,'S201905001');
INSERT INTO receipt_issue_txn
VALUES
    ('A0003'
    ,8
    ,'AAA'
    ,SYSDATE
    ,'S201905001');

UPDATE receipt_issue_txn
SET    txn_quantity = -txn_quantity
WHERE  receipt_issue_no = 'S201905001';

COMMIT;

CREATE TABLE item_info(item_code VARCHAR2(10)
                      ,item_name VARCHAR2(100)
                      ,item_spce VARCHAR2(50)
                      ,receipt_price NUMBER
                      ,sale_price NUMBER);

CREATE TABLE receipt_info(receipt_no VARCHAR2(10)
                         ,receipt_vendor VARCHAR2(10)
                         ,receipt_item VARCHAR2(10)
                         ,receipt_amount NUMBER
                         ,receipt_sub VARCHAR2(10));

CREATE TABLE issue_info(issue_no VARCHAR2(10)
                       ,issue_vendor VARCHAR2(10)
                       ,issue_item VARCHAR2(10)
                       ,issue_amount NUMBER
                       ,issue_sub VARCHAR2(10));

drop TABLE receipt_issue_txn;
CREATE TABLE receipt_issue_txn(item_code VARCHAR2(10)
                              ,txn_quantity NUMBER
                              ,txn_sub VARCHAR2(10)
                              ,txn_date DATE
                              ,receipt_issue_no VARCHAR2(10));
