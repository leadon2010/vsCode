create table fileboard(
      num number,
      author varchar(30),
      title varchar(30),
      fileName varchar(50),
      day varchar(30)
);
create sequence file_num
start with 1
increment by 1;