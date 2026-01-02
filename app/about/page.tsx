"use client";

import Image from "next/image";
import { Leaf, Truck, Heart, Users, Award, Clock } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-[#102215] py-20 text-white sm:py-32">
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <h1 className="mb-6 text-4xl font-[900] tracking-tight sm:text-6xl lg:text-7xl">
                        We Deliver <span className="text-[#13EC49]">Freshness</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-gray-300 sm:text-xl">
                        At FreshMarket, we believe that everyone deserves access to fresh, healthy, and organic food. We bridge the gap between local farmers and your kitchen table.
                    </p>
                </div>

                {/* Abstract Background Shapes */}
                <div className="absolute left-1/2 top-1/2 -z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#13EC49] opacity-10 blur-[120px]"></div>
            </section>

            {/* Mission Section */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center text-center lg:text-left">
                        <div className="relative mx-auto h-[400px] w-full max-w-sm overflow-hidden rounded-3xl lg:mx-0">
                            {/* Using a placeholder or generic food image from unsplash if local assets aren't available, but using colors for now if image fails */}
                            <div className="absolute inset-0 bg-gray-200">
                                <Image
                                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000"
                                    alt="Fresh vegetables in a basket"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className="mb-6 text-3xl font-[800] text-[#0D1B11] sm:text-4xl">
                                Our Mission & Vision
                            </h2>
                            <p className="mb-6 text-lg text-gray-600">
                                Founded with a simple mission: to make high-quality, farm-fresh groceries accessible to everyone. We started as a small neighborhood delivery service and have grown into a community of food lovers who care about what they eat.
                            </p>
                            <p className="text-lg text-gray-600">
                                We work directly with local organic farmers to ensure that every vegetable, fruit, and grain you buy from us is not just fresh, but also sustainably sourced.
                            </p>

                            <div className="mt-10 grid grid-cols-2 gap-6">
                                <div className="rounded-2xl bg-[#F6F8F6] p-6 text-center">
                                    <h3 className="text-3xl font-[900] text-[#13EC49]">10k+</h3>
                                    <p className="font-semibold text-[#0D1B11]">Happy Customers</p>
                                </div>
                                <div className="rounded-2xl bg-[#F6F8F6] p-6 text-center">
                                    <h3 className="text-3xl font-[900] text-[#13EC49]">500+</h3>
                                    <p className="font-semibold text-[#0D1B11]">Local Farmers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-[#F6F8F6] py-24">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-[800] text-[#0D1B11] sm:text-4xl">Why Choose Us?</h2>
                        <p className="mt-4 text-gray-600">We don't just sell food; we sell a lifestyle of health and quality.</p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: Leaf,
                                title: "100% Organic",
                                desc: "Certified organic produce sourced directly from trusted partners.",
                            },
                            {
                                icon: Clock,
                                title: "Fast Delivery",
                                desc: "Order by 2 PM and get same-day delivery right to your doorstep.",
                            },
                            {
                                icon: Heart,
                                title: "Quality First",
                                desc: "We rigorously check every item. If it's not perfect, we don't send it.",
                            },
                            {
                                icon: Users,
                                title: "Community Focused",
                                desc: "We support local food banks and community initiatives.",
                            },
                            {
                                icon: Truck,
                                title: "Sustainable Logistics",
                                desc: "Our delivery fleet is moving towards 100% electric vehicles.",
                            },
                            {
                                icon: Award,
                                title: "Award Winning",
                                desc: "Voted best local grocery delivery service 3 years in a row.",
                            },
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="group rounded-3xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#13EC49]/10 text-[#13EC49] group-hover:bg-[#13EC49] group-hover:text-white transition-colors">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-[700] text-[#0D1B11]">{item.title}</h3>
                                    <p className="text-gray-600">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 text-center">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl rounded-[2.5rem] bg-[#102215] px-6 py-16 text-white text-center shadow-2xl">
                        <h2 className="mb-6 text-3xl font-[800] sm:text-5xl">Start Eating Healthy Today</h2>
                        <p className="mx-auto mb-10 max-w-xl text-lg text-gray-300">
                            Join thousands of satisfied customers who have made the switch to fresh, delivered groceries.
                        </p>
                        <a
                            href="/products"
                            className="inline-flex items-center justify-center rounded-full bg-[#13EC49] px-8 py-4 text-lg font-bold text-[#0D1B11] transition-transform hover:scale-105 active:scale-95"
                        >
                            Shop Now
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
