"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PersianRestaurant() {
  const [showDailySpecials, setShowDailySpecials] = useState(false)
  const [activeSection, setActiveSection] = useState("all")
  const [cart, setCart] = useState<{ [key: string]: number }>({})
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [cartAnimation, setCartAnimation] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const dailySpecials = {
    شنبه: { name: "قورمه سبزی با برنج", description: "خورش سنتی با سبزیجات معطر و گوشت", price: "38000" },
    یکشنبه: { name: "فسنجان با برنج", description: "خورش مجلسی با آلو و گردو", price: "42000" },
    دوشنبه: { name: "قیمه با برنج", description: "خورش محبوب با نخود و سیب‌زمینی", price: "35000" },
    سه‌شنبه: { name: "خورش بامیه", description: "خورش خوشمزه با بامیه تازه", price: "36000" },
    چهارشنبه: { name: "خورش کرفس", description: "خورش عطری با کرفس و سبزیجات", price: "37000" },
    پنج‌شنبه: { name: "خورش قارچ", description: "خورش مدرن با قارچ‌های تازه", price: "39000" },
    جمعه: { name: "زرشک پلو با مرغ", description: "برنج زعفرانی با زرشک و مرغ", price: "45000" },
  }

  const menuItems = {
    چلوکباب: [
      {
        name: "کباب کوبیده",
        price: "45000",
        image: "/persian-koobideh-kebab.png",
        description: "کباب سنتی از گوشت چرخ کرده با ادویه‌های خاص",
        rating: 4.8,
        popular: true,
      },
      {
        name: "کباب برگ",
        price: "65000",
        image: "/persian-barg-kebab.png",
        description: "کباب مخصوص از گوشت گوساله مرغوب",
        rating: 4.9,
        popular: true,
      },
      {
        name: "کباب جوجه",
        price: "55000",
        image: "/persian-joojeh-kebab.png",
        description: "کباب مرغ با زعفران و لیمو",
        rating: 4.7,
        popular: false,
      },
      {
        name: "کباب سلطانی",
        price: "75000",
        image: "/persian-soltani-kebab.png",
        description: "ترکیب کباب برگ و کوبیده",
        rating: 4.9,
        popular: true,
      },
    ],
    خوراک‌ها: [
      {
        name: "قورمه سبزی",
        price: "35000",
        image: "/placeholder-tvoa3.png",
        description: "خورش سنتی با سبزیجات معطر",
        rating: 4.6,
        popular: true,
      },
      {
        name: "فسنجان",
        price: "40000",
        image: "/persian-fesenjan.png",
        description: "خورش مجلسی با آلو و گردو",
        rating: 4.8,
        popular: true,
      },
      {
        name: "قیمه",
        price: "30000",
        image: "/persian-gheymeh.png",
        description: "خورش محبوب با نخود",
        rating: 4.5,
        popular: false,
      },
      {
        name: "خورش بامیه",
        price: "32000",
        image: "/persian-bamiyeh-stew.png",
        description: "خورش خوشمزه با بامیه تازه",
        rating: 4.4,
        popular: false,
      },
    ],
  }

  const addToCart = (itemName: string) => {
    setCart((prev) => ({
      ...prev,
      [itemName]: (prev[itemName] || 0) + 1,
    }))
    setCartAnimation(true)
    setTimeout(() => setCartAnimation(false), 600)
  }

  const removeFromCart = (itemName: string) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[itemName] > 1) {
        newCart[itemName]--
      } else {
        delete newCart[itemName]
      }
      return newCart
    })
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
  }

  const getTotalPrice = () => {
    let total = 0
    Object.entries(cart).forEach(([itemName, count]) => {
      const allItems = [...menuItems.چلوکباب, ...menuItems.خوراک‌ها]
      const item = allItems.find((item) => item.name === itemName)
      if (item) {
        total += Number.parseInt(item.price) * count
      }
    })
    return total.toLocaleString("fa-IR")
  }

  const getCurrentDay = () => {
    const days = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"]
    const today = new Date().getDay()
    return days[today]
  }

  const handleDailySpecialClick = () => {
    setShowDailySpecials(!showDailySpecials)
    setActiveSection("daily")
  }

  const getFilteredMenuItems = () => {
    if (activeSection === "all") {
      return menuItems
    } else if (activeSection === "چلوکباب") {
      return { چلوکباب: menuItems.چلوکباب }
    } else if (activeSection === "خوراک‌ها") {
      return { خوراک‌ها: menuItems.خوراک‌ها }
    }
    return {}
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mb-6"></div>
          <h2 className="text-3xl font-bold text-primary mb-2">رستوران سنتی پارس</h2>
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="persian-gradient text-primary-foreground py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-element absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
          <div
            className="floating-element absolute top-32 right-20 w-16 h-16 bg-white/5 rounded-full"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="floating-element absolute bottom-20 left-32 w-12 h-12 bg-white/10 rounded-full"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="hero-content">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 drop-shadow-2xl tracking-tight">رستوران سنتی پارس</h1>
            <p className="text-2xl md:text-4xl opacity-95 font-medium mb-8 leading-relaxed">طعم اصیل غذاهای ایرانی</p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="hero-badge text-lg px-6 py-3">
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                غذای تازه روزانه
              </Badge>
              <Badge className="hero-badge text-lg px-6 py-3">
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                کیفیت برتر
              </Badge>
              <Badge className="hero-badge text-lg px-6 py-3">
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                محیط دنج و آرام
              </Badge>
            </div>
            <div className="hero-info bg-white/15 backdrop-blur-md rounded-2xl px-8 py-4 inline-block">
              <div className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-xl font-bold">روزانه ۱۰ صبح تا ۱۲ شب</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="premium-nav bg-card/95 backdrop-blur-lg shadow-2xl sticky top-0 z-40 border-b-4 border-accent">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={handleDailySpecialClick}
                className={`premium-nav-button text-lg font-bold px-8 py-4 rounded-2xl ${
                  activeSection === "daily" ? "active" : ""
                }`}
              >
                <svg className="w-6 h-6 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                غذای روز
              </Button>
              <Button
                variant="ghost"
                className={`premium-nav-button text-lg font-bold px-8 py-4 rounded-2xl ${
                  activeSection === "چلوکباب" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveSection("چلوکباب")
                  setShowDailySpecials(false)
                }}
              >
                <svg className="w-6 h-6 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                چلوکباب
              </Button>
              <Button
                variant="ghost"
                className={`premium-nav-button text-lg font-bold px-8 py-4 rounded-2xl ${
                  activeSection === "خوراک‌ها" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveSection("خوراک‌ها")
                  setShowDailySpecials(false)
                }}
              >
                <svg className="w-6 h-6 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                خوراک ها
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Button className={`premium-cart-button relative text-lg font-bold ${cartAnimation ? "cart-shake" : ""}`}>
                <svg className="w-6 h-6 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                سبد خرید
                {getTotalItems() > 0 && (
                  <Badge className="premium-cart-badge absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full min-w-7 h-7 text-sm flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
              {getTotalItems() > 0 && (
                <div className="hidden md:block text-sm text-muted-foreground">
                  <span className="font-bold text-accent">{getTotalPrice()}</span> تومان
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Daily Specials */}
      <div
        className={`${showDailySpecials ? "daily-special-visible" : "daily-special-hidden"} premium-daily-special py-16 px-4`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 text-primary">
              <svg className="w-12 h-12 inline-block ml-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              غذای امروز - {getCurrentDay()}
            </h2>
            <p className="text-xl text-muted-foreground">ویژه امروز با تخفیف ۲۰٪</p>
          </div>
          <div className="flex justify-center">
            <Card className="premium-daily-card max-w-2xl w-full">
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <Badge className="premium-day-badge text-2xl px-8 py-3 rounded-full">{getCurrentDay()}</Badge>
                </div>
                <CardTitle className="text-4xl font-bold text-accent mb-2">
                  {dailySpecials[getCurrentDay() as keyof typeof dailySpecials]?.name}
                </CardTitle>
                <p className="text-lg text-muted-foreground">
                  {dailySpecials[getCurrentDay() as keyof typeof dailySpecials]?.description}
                </p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex justify-center items-center gap-4 mb-8">
                  <span className="premium-price-tag text-2xl">
                    {dailySpecials[getCurrentDay() as keyof typeof dailySpecials]?.price} تومان
                  </span>
                  <Badge className="bg-destructive text-destructive-foreground text-lg px-4 py-2">۲۰٪ تخفیف</Badge>
                </div>
                <Button
                  className="premium-order-button text-xl px-12 py-4"
                  onClick={() => addToCart(dailySpecials[getCurrentDay() as keyof typeof dailySpecials]?.name)}
                >
                  <svg className="w-6 h-6 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  سفارش غذای امروز
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Menu */}
      <main className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Kebab Illustration */}
          {!showDailySpecials && (
            <div className="text-center mb-20">
              <div className="premium-floating-kebab inline-block">
                <img
                  src="/images/kebab-illustration.png"
                  alt="کباب سنتی"
                  className="mx-auto w-96 h-auto drop-shadow-2xl"
                />
              </div>
              <div className="mt-8">
                <h3 className="text-3xl font-bold text-primary mb-4">تازه‌ترین و بهترین غذاهای ایرانی</h3>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  با بیش از ۳۰ سال تجربه در تهیه غذاهای سنتی ایرانی، طعم اصیل را تجربه کنید
                </p>
              </div>
            </div>
          )}

          {!showDailySpecials &&
            Object.entries(getFilteredMenuItems()).map(([category, items]) => (
              <section key={category} className="mb-24">
                <div className="text-center mb-16">
                  <h2 className="text-6xl font-bold mb-6 text-primary drop-shadow-sm">{category}</h2>
                  <div className="w-32 h-1 bg-gradient-to-r from-accent to-secondary mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {items.map((item) => (
                    <Card key={item.name} className="premium-menu-item group overflow-hidden">
                      <div className="relative overflow-hidden">
                        {item.popular && (
                          <Badge className="absolute top-4 right-4 z-10 bg-destructive text-destructive-foreground">
                            محبوب
                          </Badge>
                        )}
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-64 object-cover cursor-pointer transition-all duration-700 group-hover:scale-110"
                          onClick={() => setSelectedImage(item.image)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                          <div className="flex items-center gap-1 text-white">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(item.rating) ? "text-yellow-400" : "text-gray-400"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="text-sm mr-1">{item.rating}</span>
                          </div>
                        </div>
                      </div>
                      <CardHeader className="pb-4">
                        <CardTitle className="text-2xl text-center font-bold text-foreground mb-2">
                          {item.name}
                        </CardTitle>
                        <p className="text-center text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </CardHeader>
                      <CardContent className="text-center pt-0">
                        <div className="premium-price-tag text-2xl mb-8 inline-block">{item.price} تومان</div>
                        <div className="flex justify-center">
                          {cart[item.name] ? (
                            <div className="premium-quantity-control flex items-center gap-4 bg-accent/10 rounded-2xl p-3">
                              <Button
                                size="sm"
                                className="premium-quantity-button w-12 h-12 rounded-full p-0"
                                onClick={() => removeFromCart(item.name)}
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Button>
                              <span className="mx-4 font-bold text-2xl text-accent min-w-8 text-center">
                                {cart[item.name]}
                              </span>
                              <Button
                                size="sm"
                                className="premium-quantity-button w-12 h-12 rounded-full p-0"
                                onClick={() => addToCart(item.name)}
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Button>
                            </div>
                          ) : (
                            <Button
                              onClick={() => addToCart(item.name)}
                              className="premium-add-button w-full text-lg py-3"
                            >
                              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              افزودن به سبد
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
        </div>
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-full">
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="تصویر غذا"
              className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl"
            />
            <Button className="premium-close-button absolute top-6 right-6" onClick={() => setSelectedImage(null)}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="persian-gradient text-primary-foreground py-16 px-4 mt-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">رستوران سنتی پارس</h3>
            <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              بیش از ۳۰ سال تجربه در ارائه بهترین غذاهای سنتی ایرانی با کیفیت بی‌نظیر
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 text-lg">
            <div className="text-center">
              <div className="premium-footer-icon mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="font-bold mb-3 text-xl">آدرس</h4>
              <p className="opacity-90 leading-relaxed">تهران، خیابان ولیعصر، پلاک ۱۲۳</p>
            </div>
            <div className="text-center">
              <div className="premium-footer-icon mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h4 className="font-bold mb-3 text-xl">تلفن</h4>
              <p className="opacity-90 leading-relaxed">۰۲۱-۱۲۳۴۵۶۷۸</p>
            </div>
            <div className="text-center">
              <div className="premium-footer-icon mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="font-bold mb-3 text-xl">ساعات کاری</h4>
              <p className="opacity-90 leading-relaxed">روزانه ۱۰ صبح تا ۱۲ شب</p>
            </div>
          </div>
          <div className="text-center mt-12 pt-8 border-t border-white/20">
            <p className="opacity-75">© ۱۴۰۳ رستوران سنتی پارس. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
