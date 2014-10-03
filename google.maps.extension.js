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