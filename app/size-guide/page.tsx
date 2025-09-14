import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Ruler } from "lucide-react"

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Size Guide</h1>
            <p className="text-muted-foreground">Find your perfect fit with our comprehensive size charts</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="women" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="women">Women's</TabsTrigger>
              <TabsTrigger value="men">Men's</TabsTrigger>
              <TabsTrigger value="accessories">Accessories</TabsTrigger>
            </TabsList>

            <TabsContent value="women" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ruler className="h-5 w-5" />
                    Women's Clothing Sizes
                  </CardTitle>
                  <CardDescription>All measurements are in inches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border p-3 text-left">Size</th>
                          <th className="border border-border p-3 text-left">Bust</th>
                          <th className="border border-border p-3 text-left">Waist</th>
                          <th className="border border-border p-3 text-left">Hips</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-3 font-medium">XS</td>
                          <td className="border border-border p-3">32-33</td>
                          <td className="border border-border p-3">24-25</td>
                          <td className="border border-border p-3">34-35</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">S</td>
                          <td className="border border-border p-3">34-35</td>
                          <td className="border border-border p-3">26-27</td>
                          <td className="border border-border p-3">36-37</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">M</td>
                          <td className="border border-border p-3">36-37</td>
                          <td className="border border-border p-3">28-29</td>
                          <td className="border border-border p-3">38-39</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">L</td>
                          <td className="border border-border p-3">38-40</td>
                          <td className="border border-border p-3">30-32</td>
                          <td className="border border-border p-3">40-42</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">XL</td>
                          <td className="border border-border p-3">42-44</td>
                          <td className="border border-border p-3">34-36</td>
                          <td className="border border-border p-3">44-46</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Women's Dresses</CardTitle>
                  <CardDescription>Dress sizes and measurements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border p-3 text-left">Size</th>
                          <th className="border border-border p-3 text-left">Bust</th>
                          <th className="border border-border p-3 text-left">Waist</th>
                          <th className="border border-border p-3 text-left">Hips</th>
                          <th className="border border-border p-3 text-left">Length</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-3 font-medium">XS</td>
                          <td className="border border-border p-3">32-33</td>
                          <td className="border border-border p-3">24-25</td>
                          <td className="border border-border p-3">34-35</td>
                          <td className="border border-border p-3">35-36</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">S</td>
                          <td className="border border-border p-3">34-35</td>
                          <td className="border border-border p-3">26-27</td>
                          <td className="border border-border p-3">36-37</td>
                          <td className="border border-border p-3">36-37</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">M</td>
                          <td className="border border-border p-3">36-37</td>
                          <td className="border border-border p-3">28-29</td>
                          <td className="border border-border p-3">38-39</td>
                          <td className="border border-border p-3">37-38</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">L</td>
                          <td className="border border-border p-3">38-40</td>
                          <td className="border border-border p-3">30-32</td>
                          <td className="border border-border p-3">40-42</td>
                          <td className="border border-border p-3">38-39</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">XL</td>
                          <td className="border border-border p-3">42-44</td>
                          <td className="border border-border p-3">34-36</td>
                          <td className="border border-border p-3">44-46</td>
                          <td className="border border-border p-3">39-40</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="men" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ruler className="h-5 w-5" />
                    Men's Clothing Sizes
                  </CardTitle>
                  <CardDescription>All measurements are in inches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border p-3 text-left">Size</th>
                          <th className="border border-border p-3 text-left">Chest</th>
                          <th className="border border-border p-3 text-left">Waist</th>
                          <th className="border border-border p-3 text-left">Neck</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-3 font-medium">S</td>
                          <td className="border border-border p-3">34-36</td>
                          <td className="border border-border p-3">28-30</td>
                          <td className="border border-border p-3">14-14.5</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">M</td>
                          <td className="border border-border p-3">38-40</td>
                          <td className="border border-border p-3">32-34</td>
                          <td className="border border-border p-3">15-15.5</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">L</td>
                          <td className="border border-border p-3">42-44</td>
                          <td className="border border-border p-3">36-38</td>
                          <td className="border border-border p-3">16-16.5</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">XL</td>
                          <td className="border border-border p-3">46-48</td>
                          <td className="border border-border p-3">40-42</td>
                          <td className="border border-border p-3">17-17.5</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">XXL</td>
                          <td className="border border-border p-3">50-52</td>
                          <td className="border border-border p-3">44-46</td>
                          <td className="border border-border p-3">18-18.5</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Men's Pants</CardTitle>
                  <CardDescription>Waist and inseam measurements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border p-3 text-left">Waist Size</th>
                          <th className="border border-border p-3 text-left">Waist (inches)</th>
                          <th className="border border-border p-3 text-left">Inseam Options</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-3 font-medium">28</td>
                          <td className="border border-border p-3">28</td>
                          <td className="border border-border p-3">30, 32, 34</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">30</td>
                          <td className="border border-border p-3">30</td>
                          <td className="border border-border p-3">30, 32, 34</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">32</td>
                          <td className="border border-border p-3">32</td>
                          <td className="border border-border p-3">30, 32, 34</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">34</td>
                          <td className="border border-border p-3">34</td>
                          <td className="border border-border p-3">30, 32, 34</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">36</td>
                          <td className="border border-border p-3">36</td>
                          <td className="border border-border p-3">30, 32, 34</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">38</td>
                          <td className="border border-border p-3">38</td>
                          <td className="border border-border p-3">30, 32, 34</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="accessories" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ruler className="h-5 w-5" />
                    Shoe Sizes
                  </CardTitle>
                  <CardDescription>US shoe size conversions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Women's Shoes</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-border">
                          <thead>
                            <tr className="bg-muted">
                              <th className="border border-border p-2 text-left">US Size</th>
                              <th className="border border-border p-2 text-left">Length (inches)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-border p-2">6</td>
                              <td className="border border-border p-2">9.25</td>
                            </tr>
                            <tr>
                              <td className="border border-border p-2">7</td>
                              <td className="border border-border p-2">9.625</td>
                            </tr>
                            <tr>
                              <td className="border border-border p-2">8</td>
                              <td className="border border-border p-2">10</td>
                            </tr>
                            <tr>
                              <td className="border border-border p-2">9</td>
                              <td className="border border-border p-2">10.375</td>
                            </tr>
                            <tr>
                              <td className="border border-border p-2">10</td>
                              <td className="border border-border p-2">10.75</td>
                            </tr>
                            <tr>
                              <td className="border border-border p-2">11</td>
                              <td className="border border-border p-2">11.125</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Men's Shoes</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-border">
                          <thead>
                            <tr className="bg-muted">
                              <th className="border border-border p-2 text-left">US Size</th>
                              <th className="border border-border p-2 text-left">Length (inches)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-border p-2">7</td>
                              <td className="border border-border p-2">10</td>
                            </tr>
                            <tr>
                              <td className="border border-border p-2">8</td>
                              <td className="border border-border p-2">10.375</td>
                            </tr>
                            <tr>
                              <td className="border border-border p-2">9</td>
                              <td className="border border-border p-2">10.75</td>
                            </tr>
                            <tr>
                              <td className="border border-border p-2">10</td>
                              <td className="border border-border p-2">11.125</td>
                            </tr>
                            <tr>
                              <td className="border border-border p-2">11</td>
                              <td className="border border-border p-2">11.5</td>
                            </tr>
                            <tr>
                              <td className="border border-border p-2">12</td>
                              <td className="border border-border p-2">11.875</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Belt Sizes</CardTitle>
                  <CardDescription>Belt size guide</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border p-3 text-left">Belt Size</th>
                          <th className="border border-border p-3 text-left">Waist Size</th>
                          <th className="border border-border p-3 text-left">Total Length</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-3 font-medium">S</td>
                          <td className="border border-border p-3">28-30</td>
                          <td className="border border-border p-3">34-36</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">M</td>
                          <td className="border border-border p-3">32-34</td>
                          <td className="border border-border p-3">38-40</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">L</td>
                          <td className="border border-border p-3">36-38</td>
                          <td className="border border-border p-3">42-44</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 font-medium">XL</td>
                          <td className="border border-border p-3">40-42</td>
                          <td className="border border-border p-3">46-48</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* How to Measure */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>How to Measure</CardTitle>
              <CardDescription>Tips for accurate measurements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">For Women:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>
                      • <strong>Bust:</strong> Measure around the fullest part of your bust
                    </li>
                    <li>
                      • <strong>Waist:</strong> Measure around your natural waistline
                    </li>
                    <li>
                      • <strong>Hips:</strong> Measure around the fullest part of your hips
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">For Men:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>
                      • <strong>Chest:</strong> Measure around the fullest part of your chest
                    </li>
                    <li>
                      • <strong>Waist:</strong> Measure around your natural waistline
                    </li>
                    <li>
                      • <strong>Neck:</strong> Measure around the base of your neck
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-muted/50 rounded-md p-4 mt-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Tip:</strong> For the most accurate measurements, have someone help you measure, and wear
                  well-fitting undergarments. If you're between sizes, we recommend sizing up for a more comfortable
                  fit.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
