"use client";

import axios from "axios"
import * as z from "zod";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Heading } from "@/components/heading"
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem 
} from "@/components/ui/form";

import { formSchema } from "./constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { useState } from "react";

const ConversationPage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async(values: z.infer<typeof formSchema>) =>{
        try{

        }catch(error: any){
            console.log(error);
        }finally{
            router.refresh();
        }
    };

    return (  
    <div>
        <Heading
            title="Conversation"
            description="Our most advanced conversation model."
            icon={MessageSquare}
            iconColor="text-violet-500"
            bgColor="bg-viole-500/10"
        />
        <div className="px-4 lg:px-8">
            <Form {...form}>
                <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="
                rounded-lg
                border
                w-full
                p-4
                px-3
                md:px-6
                focus-withing:shadow-sm
                grid
                grid-cols-12
                gap-2
                "
                >
                    <FormField
                    name="prompt"
                    render={({ field }) => (
                        <FormItem className="col-span-12 lg:col-span-10">
                            <FormControl className="mg-0 p-0">
                                <Input 
                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                disabled={isLoading}
                                placeholder="How do I calculate the radius of a circle?"   
                                {...field}                       
                                />
                            </FormControl>
                        </FormItem>
                    )}
                    /> 
                    <Button className="col-span-12 lg:col-span-2 w-full" 
                    disabled={isLoading}>
                        Generate
                    </Button>                   
                </form>
            </Form>
        </div>
        <div className="space-y-4 mt-4">
            Message Content
        </div>
    </div>
        
    );
}
 
export default ConversationPage;