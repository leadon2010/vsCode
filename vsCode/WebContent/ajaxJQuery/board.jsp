<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script>
        $(document).ready(function () {
            var requestPage = "${pageContext.request.contextPath}/BoardServ";

            // 기본 조회.
            $.ajax({
                url: requestPage,
                data: {
                    action: "list",
                },
                dataType: "json",
                success: function (result) {
                    console.log(result);
                    var $table = $("<table>").attr({"id":"tab1", "border":"1"});
                    $.map(result, function (r, i) {
                        $tr = $("<tr>").attr("id", r.boardNo).append(
                            $("<td>").text(r.boardNo),
                            $("<td>").text(r.title),
                            $("<td>").text(r.content),
                            $("<td>").html($("<button>").text("수정").click(onupdate)),
                            $("<td>").html($("<button>").text("삭제").click(ondelete))
                        );
                        $table.append($tr);
                    })
                    $("#show").append($table);
                }
            });

            function onupdate() {
                console.log("update " + $(this).parent().parent().children().eq(0).text());
                var boardNo = $(this).parent().parent().children().eq(0).text();
                $.ajax({
                    url: requestPage,
                    dataType: "json",
                    data: {
                        action: "get",
                        boardNo: boardNo
                    },
                    success: function (result) {
                        console.log(result);
                        var boardrow = result[0].boardNo;
                        console.log($("#"+boardrow).html());
                        $("#"+boardrow).after($("<tr>").append(
                        	$("<td>").html(boardrow).css("color","white"),
                            $("<td>").html($("<input>").attr("type","text").val(result[0].title)),
                            $("<td>").html($("<input>").attr("type","text").val(result[0].content)),
                            $("<td>").html($("<button>").text("변경").click(updateRow))
                        ));
                    }
                });
            }
            
            function updateRow(){
            	var $id = $(this).parent().parent().children().eq(0).text();
            	var $title = $(this).parent().parent().children().eq(1).children().eq(0).val();
            	var $content = $(this).parent().parent().children().eq(2).children().eq(0).val();
            	console.log($id+","+ $title+","+ $content);
            	$.ajax({
            		url:requestPage,
            		data:{
            			action:"update",
            			boardNo: $id,
            			title: $title,
            			content: $content
            		},
            		success: function(){
            			console.log();
            			
            		}
            	});
            	
            }

            function ondelete() {
                console.log("delete " + $(this).html());
                var boardNo = $(this).parent().parent().children().eq(0).text();
            }

            // 신규 글 등록.
            $("#register").on("click", function () {
                $.ajax({
                    url: requestPage,
                    data: {
                        action: "register",
                        title: $("#title").val(),
                        content: $("#content").val()
                    },
                    success: function (result) {
                        var datas = result.trim();
                        console.log(datas);
                        $("#tab1").append(
                            $("<tr>").append(
                                $("<td>").text(datas),
                                $("<td>").text($("#title").val()),
                                $("<td>").text($("#content").val())
                            )
                        );
                    }
                });
            })

            // 글 수정.


            // 글 삭제.


        });
    </script>
</head>

<body>
    <div id="show"></div>


    <form id="frm1">
        <table>
            <tr>
                <td>Title:<input type="text" id="title" name="title"></td>
                <td>Content:<input type="text" id="content" name="content"></td>
                <td><input type="button" id="register" value="register"></td>
            </tr>
        </table>
    </form>
</body>

</html>