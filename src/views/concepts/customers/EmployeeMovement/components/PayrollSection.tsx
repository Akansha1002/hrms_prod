import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Switcher from '@/components/ui/Switcher'
import { FormItem } from '@/components/ui/Form'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import ComputeCtcDrawer from '../../ComputeCtc/components/ComputeCtcDrawer'


const PayRollSection = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const handleOnClick = () => {
        setDrawerOpen(true);
    }

    return (
        <>
            <Card>
                <h4 className="mb-6">Payroll</h4>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between gap-8">
                        <FormItem>
                            <div className="flex items-center justify-between gap-8">
                                <div className="flex items-center justify-between gap-1">
                                    <Switcher
                                        checked
                                    />
                                    <p>PF Applicable</p>
                                </div>
                            </div>
                        </FormItem>
                        <FormItem
                            label="PF No."
                        >
                            <Input
                                type="text"
                            />
                        </FormItem>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                        <FormItem>
                            <div className="flex items-center justify-between gap-8">
                                <div className="flex items-center justify-between gap-1">
                                    <Switcher
                                        checked
                                    />
                                    <p>ESI Applicable</p>
                                </div>
                            </div>
                        </FormItem>
                        <FormItem
                            label="ESI Number"
                        >
                            <Input
                                type="text"
                            />
                        </FormItem>

                    </div>
                    <div className="flex items-center justify-between gap-8">
                        <FormItem>
                            <div className="flex items-center justify-between gap-8">
                                <div className="flex items-center justify-between gap-1">
                                    <Switcher
                                        checked
                                    />
                                    <p>PT Applicable</p>
                                </div>
                            </div>
                        </FormItem>
                        <FormItem
                            label="PT Location"
                        >
                            <Input
                                type="text"
                            />
                        </FormItem>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                        <FormItem>
                            <div className="flex items-center gap-1">
                                <Switcher
                                    checked
                                />
                                <p>Pay Process</p>
                            </div>
                        </FormItem>
                        <FormItem>
                            <div className="flex items-center gap-1">
                                <Switcher
                                    checked
                                />
                                <p>Salary Hold</p>
                            </div>
                        </FormItem>
                        <FormItem>
                            <div className="flex items-center gap-1">
                                <Switcher
                                    checked
                                />
                                <p>Billable</p>
                            </div>
                        </FormItem>
                    </div>
                    <FormItem
                        label="Increment From Date"
                    >
                        <Input type="date"
                        />
                    </FormItem>
                    <FormItem
                        label="Increment Released Date"
                    >
                        <Input type="date"
                        />
                    </FormItem>
                    <FormItem
                        label="GL Code"
                    >
                        <Input
                            type="text"
                        />
                    </FormItem>
                    <FormItem
                        label="Pay Mode"
                    >
                        <Input
                            type="text"
                        />
                    </FormItem>
                    <FormItem
                        label="Applied From"
                    >
                        <Input
                            type="text"
                        />
                    </FormItem>
                    <FormItem
                        label="Pay Group"
                    >
                        <Input
                            type="text"
                        />
                    </FormItem>
                    <div>
                        <FormItem>
                            <div className="flex items-center gap-1">
                                <Switcher
                                />
                                <p>Salary Fitment</p>
                            </div>
                        </FormItem>
                        <FormItem className="inline-flex flex-wrap xl:flex gap-2">
                            <Button variant="solid" onClick={handleOnClick}>
                                Compute CTC
                            </Button>
                        </FormItem>
                    </div>
                    <FormItem
                        label="Comments"
                    >
                        <Input
                            type="text"
                            textArea 
                        />
                    </FormItem>
                </div>
            </Card>
            <ComputeCtcDrawer
                open={drawerOpen}
                onDrawerOpen={setDrawerOpen}
            />
        </>
    )
}

export default PayRollSection
