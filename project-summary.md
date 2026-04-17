# Project Summary — day2-tailwind2

## 1. فكرة المشروع

مشروع React كامل بيضم تاسكين:
- **Users List** — عرض قائمة users من داتا hardcoded مع search بالإيميل
- **E-commerce Shop** — تطبيق متجر إلكتروني بيجيب منتجات من API حقيقي مع routing وpagination

---

## 2. التكنولوجيز المستخدمة

| التكنولوجيا | الإصدار | الاستخدام |
|---|---|---|
| React | 19 | UI Library |
| Vite | 8 | Build Tool |
| Tailwind CSS | v4 | Styling |
| shadcn/ui | latest | UI Components (Radix - Mira preset) |
| React Router | v7 | Client-Side Routing |
| DummyJSON API | - | مصدر بيانات المنتجات |

**shadcn components المستخدمة:**
```bash
npx shadcn@latest add card badge button input
```

---

## 3. Structure الملفات

```
src/
├── components/
│   ├── ui/                  ← shadcn components (card, button, input, badge)
│   ├── MainLayout.jsx       ← Skeleton: Navbar + Outlet
│   ├── Navbar.jsx           ← Fixed navbar (Home, Cart, Users)
│   ├── ProductCard.jsx      ← كارت المنتج (صورة، سعر، stock badge، View Details)
│   ├── UserCard.jsx         ← كارد اليوزر (صورة، role chip بألوان، بيانات)
│   └── UsersList.jsx        ← قائمة Users مع Search وReset
├── pages/
│   ├── ProductsList.jsx     ← الصفحة الرئيسية: products + filter + pagination
│   ├── ProductDetails.jsx   ← تفاصيل منتج معين من API
│   ├── Cart.jsx             ← صفحة Cart (فاضية حالياً)
│   └── NotFound.jsx         ← صفحة 404
├── data/
│   └── users.js             ← بيانات hardcoded للـ users
├── App.jsx                  ← (غير مستخدم — الـ routing في main.jsx)
├── main.jsx                 ← Entry point + Router config
└── index.css                ← Tailwind + shadcn theme (dark mode)
```

---

## 4. أهم Functions مع شرح

### `main.jsx` — Router Configuration
```jsx
import { createBrowserRouter, RouterProvider } from 'react-router'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,        // Parent: Navbar ثابت
    children: [
      { index: true, element: <ProductsList /> },        // /
      { path: 'product/:id', element: <ProductDetails /> }, // /product/5
      { path: 'cart', element: <Cart /> },               // /cart
      { path: 'users', element: <UsersList /> },         // /users
      { path: '*', element: <NotFound /> },              // أي route مش موجود
    ]
  }
])
```

---

### `ProductsList.jsx` — Fetch + Pagination + Filter
```jsx
const LIMIT = 10

useEffect(() => {
  const skip = (page - 1) * LIMIT

  // لو فيه category → API خاص بالـ category
  const url = category
    ? `https://dummyjson.com/products/category/${category}?limit=${LIMIT}&skip=${skip}`
    : `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`

  fetch(url)
    .then(res => res.json())
    .then(data => {
      setProducts(data.products)  // المنتجات
      setTotal(data.total)        // العدد الكلي عشان نحسب عدد الصفحات
    })
}, [page, category]) // بيتشغل لما page أو category تتغير

// Pagination Logic
const totalPages = Math.ceil(total / LIMIT)
const skip = (page - 1) * LIMIT  // صفحة 3 → skip=20 → نبدأ من منتج 21
```

---

### `ProductDetails.jsx` — useParams + Fetch
```jsx
const { id } = useParams()  // بيقرأ الـ id من الـ URL (/product/5 → id=5)

useEffect(() => {
  fetch(`https://dummyjson.com/products/${id}`)
    .then(res => res.json())
    .then(data => setProduct(data))
}, [id])
```

---

### `UserCard.jsx` — Conditional Rendering للـ Role Chip
```jsx
// مش بنستخدم function لأن Tailwind بيولد الـ classes static
{user.role === 'admin' && (
  <span className="bg-red-500/20 text-red-400 border border-red-500/30">admin</span>
)}
{user.role === 'moderator' && (
  <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/20">moderator</span>
)}
{user.role === 'user' && (
  <span className="bg-green-500/20 text-green-400 border border-green-500/30">user</span>
)}
```

---

### `UsersList.jsx` — Search Logic
```jsx
const [searchEmail, setSearchEmail] = useState('')
const [filteredUsers, setFilteredUsers] = useState(users)
const [isSearched, setIsSearched] = useState(false)

function handleSearch() {
  const result = users.filter((user) =>
    user.email.toLowerCase().includes(searchEmail.toLowerCase())
  )
  setFilteredUsers(result)
  setIsSearched(true)
}

function handleReset() {
  setSearchEmail('')
  setFilteredUsers(users)  // رجوع للكل
  setIsSearched(false)     // إخفاء زرار Reset
}
```

---

### `ProductCard.jsx` — Stock Badge
```jsx
{stock === 0 ? (
  <span className="absolute top-2 left-2 bg-red-500/90 text-white">Out of Stock</span>
) : (
  <span className="absolute top-2 left-2 bg-green-500/90 text-white">In Stock</span>
)}
```

---

## 5. Bugs / مشاكل حالية

| المشكلة | السبب | الحل |
|---|---|---|
| زرار Add to Cart مش شغال | محتاج React Context عشان الـ state تتشارك بين الصفحات | هيتعمل بعدين بـ Context |
| Cart page فاضية | مش مطلوبة في التاسك | هيتكمل مع الـ Context |
| Filter categories hardcoded | عشان الـ API مش بيرجع الـ categories كلها في نفس الـ request | ممكن تتجيب بـ fetch منفصل |

---

## 6. آخر حاجة كنا بنعملها

**Pagination في `ProductsList.jsx`** — بنستخدم `skip` و`limit` من DummyJSON API:
- 10 منتجات في الصفحة
- أزرار للتنقل بين الصفحات
- لما تغيري الـ category بترجعي للصفحة الأولى تلقائياً

---

## 7. TODO / Next Steps

- [ ] **React Context** — عشان Add to Cart يشتغل وتتشارك الـ cart state بين الصفحات
- [ ] **Cart Page** — عرض المنتجات المضافة وحذفهم وحساب الـ total
- [ ] **Categories من API** — جيب الـ categories من `https://dummyjson.com/products/categories` بدل الـ hardcoded
- [ ] **Loading Skeleton** — بدل الـ "Loading..." نعمل skeleton cards أحسن في الشكل
- [ ] **Search في المنتجات** — `https://dummyjson.com/products/search?q=phone`

---

## إعداد المشروع من الأول

```bash
npm create vite@latest day2-tailwind2 -- --template react
cd day2-tailwind2
npm install
npm install tailwindcss @tailwindcss/vite @rolldown/plugin-babel babel-plugin-react-compiler
npm install react-router
npx shadcn@latest init  # اختاري Radix → Mira
npx shadcn@latest add card badge button input
```

**`vite.config.js`:**
```js
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
  resolve: {
    alias: { '@': new URL('./src', import.meta.url).pathname },
  },
})
```

**`main.jsx`** — ضيفي قبل الـ render:
```js
document.documentElement.classList.add('dark')
```
