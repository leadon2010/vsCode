CREATE OR REPLACE FUNCTION create_receipt_no RETURN VARCHAR2 IS
    v_new_no VARCHAR2(10);
    v_max_no VARCHAR2(10);
BEGIN
    SELECT MAX(r.receipt_no)
    INTO   v_max_no
    FROM   receipt_info r
    WHERE  SUBSTR(r.receipt_no
                 ,1
                 ,7) = 'P' || TO_CHAR(SYSDATE
                                     ,'yyyymm');

    IF v_max_no IS NULL THEN
        v_new_no := 'P' || TO_CHAR(SYSDATE
                                  ,'yyyymm') || '001';
    ELSE
        v_new_no := 'P' || TO_CHAR(SYSDATE
                                  ,'yyyymm') ||
                    LPAD(to_number(SUBSTR(v_max_no
                                         ,8)) + 1
                        ,3
                        ,'0');
    END IF;

    RETURN(v_new_no);
END create_receipt_no;
/
