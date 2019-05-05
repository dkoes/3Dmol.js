# Math Routines for 3Dmol.js

This is the documentation for the essential math involved in 3Dmol.js.
Link to the JavaScript file : [Link](https://github.com/3dmol/3Dmol.js/blob/master/3Dmol/WebGL/math.js)

## Classes

- [Quarternion](#Quarternion-Class)
- [Vector2](#Vector2-Class)
- [Vector3](#Vector3-Class)
- [Matrix3](#Matrix3-Class)
- [Matrix4](#Matrix4-Class)
- [Ray](#Ray-Class)

### Quarternion Class

#### Short Descriptiton

The quarternion is a set of 4 numbers used to represent rotations. The set is [z,y,z,w] and they are:-

```javascript
x = RotationAxis.x * sin(RotationAngle / 2)
y = RotationAxis.y * sin(RotationAngle / 2)
z = RotationAxis.z * sin(RotationAngle / 2)
w = cos(RotationAngle / 2)
```

where

- RotationAxis is the axis around which we want to make our rotation. 
- RotationAngle is the angle of rotation to be performed on this axis.

Also see why Quarternions are preferred over Euler Angles.

#### Constructor for Quarternion Class

**Quarternion(x,y,z,w)**

Parameters:

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   x  	| Number 	| Multiplier of the imaginary basis vector i. 	|
|   y  	| Number 	| Multiplier of the imaginary basis vector j. 	|
|   z  	| Number 	| Multiplier of the imaginary basis vector k. 	|
|   w  	| Number 	|         Multiplier of the real part.        	|

#### Methods

##### set(x,y,z,w)

Sets the parameters x, y, z, and w.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   x  	| Number 	| Multiplier of the imaginary basis vector i. 	|
|   y  	| Number 	| Multiplier of the imaginary basis vector j. 	|
|   z  	| Number 	| Multiplier of the imaginary basis vector k. 	|
|   w  	| Number 	|         Multiplier of the real part.        	|

Returns:

Type

*quarternion*

##### copy(q)

Copies one quarternion to another.

Parameters

| Name  	| Type        	| Description                                        	|
|-------	|-------------	|----------------------------------------------------	|
| q     	| Quarternion 	| The quarternion whose parameters have to be copied 	|

Returns:
 
Type

Quarternion

##### conjugate()

Returns the conjugate of the current quarternion.

Parameters: none

Returns:
 
Type

Quarternion

##### inverse()

Returns the inverse quarternion rotation.

Parameters: none

Returns:
 
Type

Quarternion

##### length()

Returns length from Origin (includes the rotation angle, w)

Parameters: none

Returns:
 
Type

Number

##### lengthxyz()

Returns length from Origin (does not includes the rotation angle, w)

Parameters: none

Returns:
 
Type

Number

##### normalize()

Normalize the quaternion. 
Note : Values of the quarternion are changed.
Returns:
 
Type

Quarternion

##### multiply(q)

Multiplies current quarternion with q.

Parameters

| Name  	| Type        	| Description                                        	|
|-------	|-------------	|----------------------------------------------------	|
| q     	| Quarternion 	| The quarternion whose parameters have to be multiplied	|

Returns:
 
Type

Quarternion

##### multiplyScalar(s)

Multiplies every parameter of the quarternion with the scalar s.

Parameters

| Name  	| Type        	| Description                                        	|
|-------	|-------------	|----------------------------------------------------	|
| s     	| Number 	| The number with which the parameters should be multiplied	|

Returns:
 
Type

Quarternion

##### sub(q)

Subtracts the parameters of q from the current quarternion.

Parameters

| Name  	| Type        	| Description                                        	|
|-------	|-------------	|----------------------------------------------------	|
| q     	| Quarternion 	| The quarternion whose parameters have to be subtracted 	|

Returns:
 
Type

Quarternion

##### clone()

Returns the clone of the current quarternion.

Parameters

None

Returns:
 
Type

Quarternion

##### setfromEuler(e)

Converts and sets the values of the parameters of the current quarternion from Euler Angles.


Parameters

| Name  	| Type        	| Description                                        	|
|-------	|-------------	|----------------------------------------------------	|
| e     	| Euler Angle Vector	| The Euler Angle Vector from whom the values are converted. 	|

Returns:
 
Type

Quarternion

### Vector2 Class

#### Short Description

A 2D vector consists of 2 parameters x and y.
It is used to represent points on a 2D plane. 

#### Constructor for Vector2

##### Vector2(x,y)

Initializes a vector2 object.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   x  	| Number 	| Multiplier of the imaginary basis vector i. 	|
|   y  	| Number 	| Multiplier of the imaginary basis vector j. 	|

Returns

Type 

Vector2

#### Methods

##### set(x,y)

Used to set the values of x and y parameters for Vector2.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   x  	| Number 	| Multiplier of the imaginary basis vector i. 	|
|   y  	| Number 	| Multiplier of the imaginary basis vector j. 	|


Returns

Type 

Vector2

##### subVectors(a,b)

Subtracts the two vectors a and b and returns a new vector(Performs a-b).

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   a  	| Vector2 	| Vector a from which a vector is subtracted	|
|   b  	| Vector2 	| Vector b to be subtracted	|


Returns

Type 

Vector2

##### copy(v)

Copies the contents of another vector2 to the current vector.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   v  	| Vector2 	| Vector v from which values are copied	|


Returns

Type 

Vector2

##### clone()

Used to create a clone of the current vector.

Parameters

None

Returns

Type

Vector2

### Vector3 Class

#### Short Description 

A 3D vector consists of 3 parameters x, y, and z.
It is used to represent points on a 3D plane.

#### Constructor for Vector3

##### Vector3(x,y,z)

Initializes a vector3 object.

Parameters:

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   x  	| Number 	| Multiplier of the imaginary basis vector i. 	|
|   y  	| Number 	| Multiplier of the imaginary basis vector j. 	|
|   z  	| Number 	| Multiplier of the imaginary basis vector k. 	|

Returns

Type 

Vector3

#### Methods

##### set(x,y,z)

Used to set the values of x, y and z parameters for Vector3.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   x  	| Number 	| Multiplier of the imaginary basis vector i. 	|
|   y  	| Number 	| Multiplier of the imaginary basis vector j. 	|
|   z  	| Number 	| Multiplier of the imaginary basis vector k. 	|

Returns

Type 

Vector3

##### copy(v)

Copies the contents of another Vector3 to the current vector.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   v  	| Vector3 	| Vector v from which values are copied	|


Returns

Type 

Vector3

##### add(v)

Adds the values of vector v to the current vector.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   v  	| Vector3	| Vector v from which values are added	|


Returns

Type 

Vector3

##### addVectors(a,b)

Adds the two vectors a and b and returns the new vector.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   a  	| Vector3	| The first vector	|
|   b  	| Vector3 	| The second vector	|

Returns

Type

Vector3

##### sub(v)

Subtracts v from the current vector and returns the result.


Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   v  	| Vector3 	| Vector v getting subtracted |

Returns

Type 

Vector3


##### subVectors(a,b)

Subtracts the two vectors a and b and returns a new vector(Performs a-b).

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   a  	| Vector3 	| Vector a from which a vector is subtracted	|
|   b  	| Vector3 	| Vector b to be subtracted	|

Returns

Type 

Vector3

##### multiplyScalar(s)

Multiplies all the parameters of the current vector by s.

Parameters 

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   s  	| Number 	| A scalar value multiplied to all parameters|

Returns

Type 

Vector3

##### divideScalar(s)

Divides all parameters of the vector by s.
If divided by 0, sets all parameters to zero.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   s  	| Number 	| A scalar value that divides all parameters|

Returns

Type 

Vector3

##### max(s)

Accumulates the maximum of parameters of the current vector and s.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   s  	| Vector3 	| Vector s to be compared with |

Returns

Type 

Vector3


##### min(s)

Accumulates the minimum of parameters of the current vector and s.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   s  	| Vector3 	| Vector s to be compared with |

Returns

Type 

Vector3

##### distanceTo(v)

Calculates the distance between two points/vectors on a 3D plane.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   v  	| Vector3 	| Vector v to which distance should be calculated |

Returns

Type 

Number


##### distanceToSquared(v)

Calculates the squared distance between two points/vectors on a 3D plane.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   v  	| Vector3 	| Vector v to which distance squared should be calculated |

Returns

Type 

Number

##### applyMatrix4(m)

Multiplies the matrix by the current vector and returns the resultant vector.
Used to rotate a point/vector by a rotation matrix.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   m  	| Matrix4 	| Matrix m by which the vector is multiplied |

Returns

Type 

Vector3

##### applyProjection(m)

Multiply a vector with the projection matrix.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   m  	| Matrix4 	| Matrix m ($3Dmol.Matrix4)which is the projection Matrix |

Returns

Type 

Vector3

##### applyQuarternion(q)

Multiplies the vector with a quarternion. Used for rotating a vector by a quarternion using a fast approach.[Link](https://blog.molecular-matters.com/2013/05/24/a-faster-quaternion-vector-multiplication/)

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   q  	| Quarternion 	| The quarternion q by which the vector must be rotated/multiplied |

Returns

Type 

Vector3

##### negate()

Negates/Reverses the current vector.(multiplies by -1)

Parameters

None

Returns

Type

Vector3

##### dot(v)

Calculates the dot product of the current vector and the vector v.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   v  	| Vector3 	| Vector v with which dot product should be calculated |

Returns

Type 

Vector3

##### length()

Returns the length of the vector(distance from the origin)

Parameters

None

Returns

Type

Number

##### lengthSq()

Returns the squared length of the vector(distance from the origin)

Parameters

None

Returns

Type

Number

##### normalize()

Divides the vector by its own length. Returns a unit vector in that direction.

Parameters

None

Returns

Type

Vector3

##### cross(v)

Returns the cross product of the current vector with vector v.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   v  	| Vector3 	| Vector v to which cross product should be calculated |

Returns

Type 

Vector3

##### crossVectors(a,b)

Returns the cross product of two vectors a and b.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   a 	| Vector3 	| First Vector |
|   a 	| Vector3 	| Second Vector |

Returns

Type 

Vector3

###### getPositionFromMatrix(m)

The translation components of an MVP matrix occupies the 12, 13 and 14 the indices.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   m  	| Matrix4 	| The matrix from which position is got |

Returns

Type 

Vector3

##### setEulerFromRotationMatrix(m, order)

If the upper 3*3 matrix is a pure rotation matrix(that is without scaling factors), then this method converts it into the Euler form and returns the vector3.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   m  	| Matrix3 	| Matrix m from which the Euler Vector is derived. |
|   m  	| Order 	| The order should be 'XYZ' or not defined |

Returns

Type 

Vector3

##### rotateAboutVector(axis, ang)

Rotates the current vector about an axis by some angle.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   axis  	| Vector3 	| Axis about which the vector must be rotated. |
|   ang  	| Number 	| Angle by which the vector should be rotated. |

Returns

Type 

Vector3

##### setFromMatrixPosition(m)

Sets the position vector from the given matrix.


Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   m  	| Matrix4 	| The matrix from which position is set |

Returns

Type 

Vector3

##### transformDirection(m)

The vector is interpreted as direction.
The upper 3*3 matrix is multiplied with the vecor.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|   m  	| Matrix4 	| The matrix to which direction is transformed |

Returns

Type 

Vector3

##### clone()

Returns a new Vector3 clone.

Parameters

None

Returns

Type 

Vector3

### Matrix3 Class

#### Short Description

A 3x3 matrix can be instantiated.
Points on the 2D plane have their rotation, scaling ..etc matrices in their matrices in 3x3 form.

#### Constructor for Matrix3

##### Matrix3(n11, n12, n13, n21, n22, n23, n31, n32, n33)

The 9 values are set upon creation of an instance.

Parameters

| Name 	|  Type  	|                 Description                 	|
|:----:	|:------:	|:-------------------------------------------:	|
|  n11, n12, n13, n21, n22, n23, n31, n32, n33 	| Number 	| These are the values assigned to the 3x3 matrix with their subscript as matrix indexes. |



Returns

Type 

Vector3

