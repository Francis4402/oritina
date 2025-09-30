import { GetOrders } from '@/services/Orders'
import React from 'react'
import OrderTable from '../../../(dashboardLayout)/dashboard/orders/OrderTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Filter, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { TOrder } from '@/app/types/Types';

const Orders = async () => {
    const orders: TOrder[] = await GetOrders();

    // Calculate some stats for the header
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(order => order.status === 'Pending').length;
    const deliveredOrders = orders.filter(order => order.status === 'Delivered').length;
    const completedOrders = orders.filter(order => order.status === 'Completed').length;

    return (
        <div className="space-y-4 lg:space-y-6 p-4 lg:p-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Orders</h1>
                        <p className="text-sm sm:text-base text-muted-foreground mt-1">
                            Manage and track your orders efficiently
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                <Card className="flex-1 min-w-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 lg:p-6">
                        <CardTitle className="text-xs lg:text-sm font-medium">Total Orders</CardTitle>
                        <div className="text-lg">📦</div>
                    </CardHeader>
                    <CardContent className="p-4 lg:p-6 pt-0">
                        <div className="text-xl lg:text-2xl font-bold">{totalOrders}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            All time orders
                        </p>
                    </CardContent>
                </Card>

                <Card className="flex-1 min-w-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 lg:p-6">
                        <CardTitle className="text-xs lg:text-sm font-medium">Pending</CardTitle>
                        <div className="text-lg">⏳</div>
                    </CardHeader>
                    <CardContent className="p-4 lg:p-6 pt-0">
                        <div className="text-xl lg:text-2xl font-bold">{pendingOrders}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Needs attention
                        </p>
                    </CardContent>
                </Card>

                <Card className="flex-1 min-w-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 lg:p-6">
                        <CardTitle className="text-xs lg:text-sm font-medium">Delivered</CardTitle>
                        <div className="text-lg">⏳</div>
                    </CardHeader>
                    <CardContent className="p-4 lg:p-6 pt-0">
                        <div className="text-xl lg:text-2xl font-bold">{deliveredOrders}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            deliverd to customer
                        </p>
                    </CardContent>
                </Card>

                <Card className="flex-1 min-w-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 lg:p-6">
                        <CardTitle className="text-xs lg:text-sm font-medium">Completed</CardTitle>
                        <div className="text-lg">✅</div>
                    </CardHeader>
                    <CardContent className="p-4 lg:p-6 pt-0">
                        <div className="text-xl lg:text-2xl font-bold">{completedOrders}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Successfully delivered
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <Card>
                <CardHeader className="p-4 lg:p-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
                            <div className="flex gap-2 w-full lg:w-auto">
                              <div>
                                <h1 className='text-2xl font-bold'>Check The Orders</h1>
                              </div>
                                {/* Mobile Filter Sheet */}
                                <Sheet>
                                    <SheetContent side="bottom">
                                        <div className="space-y-4">
                                            {/* Add filter options here */}
                                            <div className="space-y-2">
                                                <h4 className="font-medium">Order Status</h4>
                                                <div className="space-y-2">
                                                    <label className="flex items-center space-x-2">
                                                        <input type="checkbox" className="rounded" />
                                                        <span>Pending</span>
                                                    </label>
                                                    <label className="flex items-center space-x-2">
                                                        <input type="checkbox" className="rounded" />
                                                        <span>Shipped</span>
                                                    </label>
                                                    <label className="flex items-center space-x-2">
                                                        <input type="checkbox" className="rounded" />
                                                        <span>Delivered</span>
                                                    </label>
                                                    <label className="flex items-center space-x-2">
                                                        <input type="checkbox" className="rounded" />
                                                        <span>Completed</span>
                                                    </label>
                                                    <label className="flex items-center space-x-2">
                                                        <input type="checkbox" className="rounded" />
                                                        <span>Cancelled</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                                <Button variant="outline" size="sm" className="hidden lg:flex">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filter
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0 lg:p-6 pt-0">
                    {/* Tabs for different order views */}
                    <Tabs defaultValue="all" className="space-y-4 p-4 lg:p-0">
                        <TabsList className="grid grid-cols-6 w-full h-auto p-1">
                            <TabsTrigger value="all" className="text-xs py-2 px-1 truncate">
                                All
                            </TabsTrigger>
                            <TabsTrigger value="Pending" className="text-xs py-2 px-1 truncate">
                                Pending
                            </TabsTrigger>
                            <TabsTrigger value="Shipped" className="text-xs py-2 px-1 truncate">
                                Shipped
                            </TabsTrigger>
                            <TabsTrigger value="Delivered" className="text-xs py-2 px-1 truncate">
                                Delivered
                            </TabsTrigger>
                            <TabsTrigger value="Completed" className="text-xs py-2 px-1 truncate">
                                Completed
                            </TabsTrigger>
                            <TabsTrigger value="Cancelled" className="text-xs py-2 px-1 truncate">
                                Cancelled
                            </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="all" className="space-y-4 mt-4">
                            <div className="overflow-x-auto">
                                <OrderTable orders={orders} />
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="Pending" className="space-y-4 mt-4">
                            <div className="overflow-x-auto">
                                <OrderTable orders={orders.filter(order => order.status === 'Pending')} />
                            </div>
                        </TabsContent>

                        <TabsContent value="Shipped" className="space-y-4 mt-4">
                            <div className="overflow-x-auto">
                                <OrderTable orders={orders.filter(order => order.status === 'Shipped')} />
                            </div>
                        </TabsContent>

                        <TabsContent value="Delivered" className="space-y-4 mt-4">
                            <div className="overflow-x-auto">
                                <OrderTable orders={orders.filter(order => order.status === 'Delivered')} />
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="Completed" className="space-y-4 mt-4">
                            <div className="overflow-x-auto">
                                <OrderTable orders={orders.filter(order => order.status === 'Completed')} />
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="Cancelled" className="space-y-4 mt-4">
                            <div className="overflow-x-auto">
                                <OrderTable orders={orders.filter(order => order.status === 'Cancelled')} />
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>            
        </div>
    )
}

export default Orders