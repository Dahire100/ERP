"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pencil, List, Download, Search, FileText, Printer, Grid, Columns } from "lucide-react"

export default function ItemMaster() {
  return (
    <DashboardLayout title="Add Item">
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Column: Add / Edit Item Form */}
        <div className="w-full xl:w-[400px] flex-shrink-0">
          <Card className="border-t-4 border-t-[#1a237e] shadow-sm">
            <CardHeader className="bg-pink-50/50 py-4 border-b">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-[#1a237e]">
                <Pencil className="h-4 w-4" />
                Add / Edit Item
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Item <span className="text-red-500">*</span>
                </Label>
                <Input placeholder="Enter Item" className="bg-muted/10 h-10" />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Item Category <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger className="bg-muted/10 h-10">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cat1">Category 1</SelectItem>
                    <SelectItem value="cat2">Category 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Item Sub Category <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger className="bg-muted/10 h-10">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sub1">Sub Category 1</SelectItem>
                    <SelectItem value="sub2">Sub Category 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Cost Per Piece <span className="text-red-500">*</span>
                </Label>
                <Input placeholder="Enter Price Per Piece" className="bg-muted/10 h-10" />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Sales Price <span className="text-red-500">*</span>
                </Label>
                <Input placeholder="Enter Sales Price" className="bg-muted/10 h-10" />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Low Quantity Alert
                </Label>
                <Input type="number" className="bg-muted/10 h-10" />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Description
                </Label>
                <Textarea className="bg-muted/10 min-h-[100px]" />
              </div>

              <div className="flex justify-end pt-2">
                <Button className="bg-[#1a237e] hover:bg-[#1a237e]/90 text-white min-w-[80px]">
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Add Item List */}
        <div className="flex-1">
          <Card className="border-t-4 border-t-[#1a237e] shadow-sm">
            <CardHeader className="bg-pink-50/50 py-4 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold flex items-center gap-2 text-[#1a237e]">
                <List className="h-4 w-4" />
                Add Item List
              </CardTitle>
              <Button size="sm" className="bg-[#1a237e] hover:bg-[#1a237e]/90 text-white gap-2">
                <Download className="h-4 w-4" />
                Import Item
              </Button>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Filters */}
              <div className="grid md:grid-cols-2 gap-4">
                <Select>
                  <SelectTrigger className="bg-muted/10 h-10">
                    <SelectValue placeholder="Select Item Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="cat1">Category 1</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="bg-muted/10 h-10">
                    <SelectValue placeholder="Select Item Subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="sub1">Subcategory 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Table Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-[#1a237e] hover:bg-[#1a237e]/90 text-white border-none rounded-sm">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-[#1a237e] hover:bg-[#1a237e]/90 text-white border-none rounded-sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-[#1a237e] hover:bg-[#1a237e]/90 text-white border-none rounded-sm">
                    <Printer className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-[#1a237e] hover:bg-[#1a237e]/90 text-white border-none rounded-sm">
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-[#1a237e] border-[#1a237e]/20 gap-2">
                    <Columns className="h-3 w-3" />
                    Column visibility
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Search:</span>
                  <Input className="h-8 w-[150px] lg:w-[200px]" />
                </div>
              </div>

              {/* Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-pink-50/50">
                    <TableRow>
                      <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">ITEM</TableHead>
                      <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">CATEGORY/SUBCATEGORY</TableHead>
                      <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">PRICE PER PIECE</TableHead>
                      <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">SALES PRICE</TableHead>
                      <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">TOTAL QUANTITY</TableHead>
                      <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">SOLD RETURN QUANTITY</TableHead>
                      <TableHead className="font-bold text-[#1a237e] whitespace-nowrap">STOCK QUANTITY</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Sample Row 1 */}
                    <TableRow className="hover:bg-muted/50">
                      <TableCell className="font-medium">16MM ARMORED CABLE 4CORE</TableCell>
                      <TableCell>ELECTRICAL-CABLE</TableCell>
                      <TableCell>25000</TableCell>
                      <TableCell>1.00</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>0</TableCell>
                    </TableRow>
                    {/* Sample Row 2 */}
                    <TableRow className="hover:bg-muted/50">
                      <TableCell className="font-medium">200</TableCell>
                      <TableCell>Note book-4 Line Paper</TableCell>
                      <TableCell>15</TableCell>
                      <TableCell>50.00</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>0</TableCell>
                    </TableRow>
                    {/* Sample Row 3 */}
                    <TableRow className="hover:bg-muted/50">
                      <TableCell className="font-medium">abc</TableCell>
                      <TableCell>bag-abc</TableCell>
                      <TableCell>200</TableCell>
                      <TableCell>300.00</TableCell>
                      <TableCell>101</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>7</TableCell>
                    </TableRow>
                    {/* Sample Row 4 */}
                    <TableRow className="hover:bg-muted/50">
                      <TableCell className="font-medium">ABC-Item</TableCell>
                      <TableCell>ABC-Cate-ABC-SubCate</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>20.00</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>0</TableCell>
                    </TableRow>
                    {/* Sample Row 5 */}
                    <TableRow className="hover:bg-muted/50">
                      <TableCell className="font-medium">Apples</TableCell>
                      <TableCell>Food-Apples</TableCell>
                      <TableCell>1000</TableCell>
                      <TableCell>0.00</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>1</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-muted-foreground">
                  Showing 1 to 5 of 77 entries
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                    &lt;
                  </Button>
                  <Button size="sm" className="h-8 w-8 p-0 bg-[#1a237e] text-white hover:bg-[#1a237e]/90">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    3
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    4
                  </Button>
                  <span className="text-muted-foreground">...</span>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    &gt;
                  </Button>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

