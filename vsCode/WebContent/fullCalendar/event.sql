-- Create table
create table CALEVENTS
(
  title      VARCHAR2(30),
  start_date VARCHAR2(20),
  end_date   VARCHAR2(20)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

INSERT INTO calevents
VALUES
    ('event1'
    ,'2018-09-06'
    ,'2018-09-06');
INSERT INTO calevents
VALUES
    ('event2'
    ,'2018-09-08'
    ,'2018-09-09');
INSERT INTO calevents
VALUES
    ('event3'
    ,'2018-09-11'
    ,'2018-09-15');
INSERT INTO calevents
VALUES
    ('event4'
    ,'2018-10-11'
    ,'2018-10-15');
INSERT INTO calevents
VALUES
    ('event5'
    ,'2018-11-17'
    ,'2018-11-25');
    