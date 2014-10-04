/*

.getCenterWithAnotherLatLng(projection, latlng)

this function will return the center between two point
on google map, there exist two route between the two point;
this function will find the shorter line's center, it also can fit for line cross international line;

 */
google.maps.LatLng.prototype.getCenterWithAnotherLatLng = function(projection, latlng){
    
    if(projection == undefined) alert('projection is undefined');

    //transaction latlng to point(v3 to v2)
    var start = projection.fromLatLngToPoint(this);
    var end   = projection.fromLatLngToPoint(latlng);

    var left_distance_x_in_v2 = 0;
    var right_distance_x_in_v2 = 0;
    var x;

    if(start.x >= end.x){
        left_distance_x_in_v2 = start.x - end.x;
        right_distance_x_in_v2 = 256 - start.x + end.x;
        if(left_distance_x_in_v2 <= right_distance_x_in_v2){
            x = end.x + (start.x - end.x) / 2;
        }else{
            x = start.x + (256 - start.x + end.x) / 2;
        }
    }else{
        left_distance_x_in_v2 = 256 - end.x + start.x;
        right_distance_x_in_v2 = end.x - start.x;
        if(left_distance_x_in_v2 <= right_distance_x_in_v2){
            x = end.x + (256 - end.x + start.x) / 2;
        }else{
            x = start.x + (end.x - start.x) / 2;
        }
    }

    return projection.fromPointToLatLng(
                                new google.maps.Point(
                                    x,
                                    (end.y + start.y) / 2
                                )
                        );
}

google.maps.LatLng.prototype.getCenterPointList = function(projection, latlng, max_count){
    if(projection == undefined) alert('projection is undefined');

    //transaction latlng to point(v3 to v2)
    var start = projection.fromLatLngToPoint(this);
    var end   = projection.fromLatLngToPoint(latlng);
    
    var construct_middle_point_list = function(projection, require_point_list){
        if(require_point_list.length >= 17){
            return require_point_list;
        }

        var copy_of_list = jQuery.extend([],require_point_list);
        var middle_point_count = 0;

        var start, end, middle;

        for(var i=0; i<require_point_list.length-1; i++){
            
            var middle_point = get_middle_point(
                    projection.fromLatLngToPoint(require_point_list[i]),
                    projection.fromLatLngToPoint(require_point_list[i+1])
                );

            // middle = new google.maps.Point((start.x-start.x-start.x)/2, start.y+(end.y-start.y)/2);

            copy_of_list.splice(i+middle_point_count+1, 0, middle_point);
            middle_point_count++;
        }
        // return copy_of_list;
        return construct_middle_point_list(projection, copy_of_list);
    }

    var get_middle_point = function(start, end){
        var left_distance_x_in_v2 = 0;
        var right_distance_x_in_v2 = 0;

        if(start.x >= end.x){
            left_distance_x_in_v2 = start.x - end.x;
            right_distance_x_in_v2 = 256 - start.x + end.x;
            if(left_distance_x_in_v2 <= right_distance_x_in_v2){
                // 1
                middle_point = projection.fromPointToLatLng(
                                    new google.maps.Point(
                                        end.x + (start.x - end.x) / 2,
                                        (end.y + start.y) / 2
                                    )
                            );
            }else{
                // 2
                middle_point = projection.fromPointToLatLng(
                                    new google.maps.Point(
                                        start.x + (256 - start.x + end.x) / 2,
                                        (start.y + end.y) / 2
                                    )
                            );
            }
        }else{
            left_distance_x_in_v2 = 256 - end.x + start.x;
            right_distance_x_in_v2 = end.x - start.x;
            if(left_distance_x_in_v2 <= right_distance_x_in_v2){
                // 4
                middle_point = projection.fromPointToLatLng(
                                    new google.maps.Point(
                                        end.x + (256 - end.x + start.x) / 2,
                                        (start.y + end.y) / 2
                                    )
                            );
            }else{
                // 3
                middle_point = projection.fromPointToLatLng(
                                    new google.maps.Point(
                                        start.x + (end.x - start.x) / 2,
                                        (start.y + end.y) / 2
                                    )
                            );
            }
        }
        return middle_point;
    }

    return construct_middle_point_list(projection, [this, latlng]);
}



