# DSA - Digital Signature Algorithm - Verified Test Cases

## ✓ Các Tham Số Hợp Lệ (Verified & Working)

Chỉ có 2 test cases **hoàn toàn hợp lệ** khi kiểm tra toàn bộ điều kiện DSA.

### Test Case 1 ✓ (Mặc định hiện tại)
```
p = 23,  q = 11,  h = 6,  xA = 8,  k = 9,  H(M) = 10

Validation:
- (p-1) mod q = 0 ✓
- h^q mod p = 1 ✓  (generator hợp lệ)

Kết quả:
- yA = 18
- r = 5, s = 8
- Verification: v = 5 ✓ (v == r) SUCCESS
```

### Test Case 2 ✓
```
p = 47,  q = 23,  h = 7,  xA = 13,  k = 5,  H(M) = 11

Validation:
- (p-1) mod q = 0 ✓
- h^q mod p = 1 ✓  (generator hợp lệ)

Kết quả:
- yA = 25
- r = 5, s = 6
- Verification: v = 5 ✓ (v == r) SUCCESS
```

## ✗ Tham Số Có Lỗi trong Bảng

### Test Case 3 - GENERATOR KHÔNG HỢP LỆ ✗
```
Từ bảng: p = 139,  q = 23,  h = 12,  xA = 14,  k = 8,  H(M) = 18

❌ Kiểm tra: h^q mod p = 12^23 mod 139 = 97 (phải = 1)
   GENERATOR KHÔNG HỢP LỆ → Verification sẽ thất bại
```

### Test Case 4 - GENERATOR KHÔNG HỢP LỆ ✗
```
Từ bảng: p = 607,  q = 101,  h = 11,  xA = 19,  k = 8,  H(M) = 14

❌ Kiểm tra: h^q mod p = 11^101 mod 607 = 210 (phải = 1)
   GENERATOR KHÔNG HỢP LỆ → Verification sẽ thất bại
```

### Test Case 5 - GENERATOR KHÔNG HỢP LỆ ✗
```
Từ bảng: p = 809,  q = 101,  h = 20,  xA = 16,  k = 24,  H(M) = 31

❌ Kiểm tra: h^q mod p = 20^101 mod 809 = 318 (phải = 1)
   GENERATOR KHÔNG HỢP LỆ → Verification sẽ thất bại
```

## Yêu Cầu Tham Số DSA

Để DSA hoạt động đúng, **tất cả điều kiện** dưới đây phải được thỏa mãn:

### 1. Prime Numbers
- p phải là **số nguyên tố lớn**
- q phải là **số nguyên tố** và q < p

### 2. Chia Hết
- **(p-1) phải chia hết cho q**
- $(p-1) \bmod q = 0$

### 3. Generator Hợp Lệ  
- **h là generator**: $h^q \bmod p = 1$
- $1 < h < p$

### 4. Keys và Nonce
- $1 \leq x_A < q$ (private key)
- $1 \leq k < q$ (random nonce, gcd(k,q) = 1)
- $H(M) \geq 0$ (message hash)

## Công Thức DSA

### Tạo Public Key
$$y_A = h^{x_A} \bmod p$$

### Tạo Chữ Ký
$$r = (h^k \bmod p) \bmod q$$
$$s = k^{-1} \cdot (H(M) + x_A \cdot r) \bmod q$$

### Xác Minh Chữ Ký
$$w = s^{-1} \bmod q$$
$$u_1 = (H(M) \cdot w) \bmod q$$
$$u_2 = (r \cdot w) \bmod q$$
$$v = ((h^{u_1} \cdot y_A^{u_2}) \bmod p) \bmod q$$

**Chữ ký hợp lệ khi và chỉ khi: $v = r$**

## Lưu Ý Quan Trọng

1. **Tất cả điều kiện tham số phải được thỏa mãn** - Nếu thiếu bất kỳ điều kiện nào, DSA sẽ không hoạt động
2. **Generator h rất quan trọng** - Nếu $h^q \bmod p \neq 1$, verification luôn thất bại
3. **Kiểm tra điều kiện** - Hệ thống sẽ hiển thị cảnh báo nếu tham số không hợp lệ
4. **Test Case 5 có lỗi** - h = 20 không phải là generator hợp lệ cho (p, q) = (809, 101)

## Test DSA

Sử dụng các test cases phía trên bằng cách điều chỉnh giá trị trong input controller trên giao diện.
