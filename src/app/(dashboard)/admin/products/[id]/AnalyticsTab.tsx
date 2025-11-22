import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IProductDetail } from "@/interfaces/product.interface";

export default function AnalyticsTab({
  product,
}: {
  product: IProductDetail
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Sales Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Units Sold</span>
            <span className="font-bold">{product.totalSold}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Revenue Generated</span>
            <span className="font-bold text-green-600">{product.totalRevenue.toLocaleString()} VND</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Selling Price</span>
            <span className="font-bold text-primary">{product.selling_price.toLocaleString()} VND</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Latest Import Price</span>
            <span className="font-bold">{product.import_price.toLocaleString()} VND</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stock Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Current Stock Level</span>
            <span className="font-bold">{product.stock_quantity}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Last Import On</span>
            <span className=" ">
              {new Date(product.lastImportDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}