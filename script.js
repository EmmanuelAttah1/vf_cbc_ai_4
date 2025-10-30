const address = "http://127.0.0.1:8000"

const chat_container = document.getElementById('chat')
const match_container = document.getElementById("matches")
const messages = document.getElementById("messages")
const message_input = document.getElementById("chat_input")
const opportunity_container = document.getElementById("opportunities")


const imagePaths = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCFb8utoE_glloxim08BO5AYZLxlO8cpvKb9exgZsdIXiWw_AlOYOSh5GzwTDiW3mFuGUd_sSKQy9u-oqxGrh9bSiS9mE6kG5L_c0P50wVw26KnXdvHitloOdwTHe31ZlF2zYHJ31gFEa9AL59SS5118VBOwT-UkcEHhuyvAEMYO25an2A7NKoOjijDMQ9W-_U1zB1k6QPMJ0wtbAIfe5TRrhXVdY0mkwuwM9IkUaDrwsZwkfbuOEBojjY7Yp-5BysrmVEfaRoNd58",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDkq1Vmp8lQC29mxeVQVeLUXZ7e11deceEf-0wiB67NtB4lOCqno_3oAObkoUHr7SFQTwXB7TlKd2T9zHI-KYk1wvvBAJ2hpJXultWr8inh31uFETMlEmvLO2ed3vc2LKawLDn0jVxS1Ml7Dmxds_aXx0Q8yvYd9OJqJNWJ1Fp2_iH_nkB-e6ITwR_VXUfqKwCmbwlqbcDqo5AHRlyh4K8wMbVGqeMTsB4SYIi9JTFAzHNEooWKT9p2x6JuNk911qdscVcJMwiWEBY",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBQA0W_k1Tlzo0hMzQdCWmShhrL1MaVb0aiXN3MxpM9ebOd-RDoNBBKstSBk28H5XMl2_I4scKf5ks_7qU7B6-JQnsqdjao-YA3ilG-JmblstOHsOzK8PwtrQ63xl4fa0tZnfyYcrQcArdVcS0xCNem3-WS8-1e-m_tDS_fjzdGpb2P4JCh9Ct7EvyPxDgs1_H70n4U8-BmK4V_BZjpi-sFjC2BvvitEZtfS5P_zKyYxlCeLTW3JnhpF7t4DqTJR7C1g8fSh7KwzmM",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDXkA-mS_tSCzEU9n4kSxPn4tNHnf4zErarvg2Xp8_7mx9i_IX9wues9ZMLctsG-hG95FaUvxFvxD20TtMg6BQsJPnV2rV33xOYI4FYh9OHdO3aBjl2btvr2qTBmbHF5gKVVr48y945_92U2OAFEI0AsWfDNXPKrX6Es2DcyWlLxw5oL1JmUQaJ2LU7qJ8_LDagR1_ANIvCOIVAQGtWDV3r5ZcF5DKqv1kCUpJDWj0soi-XrUeubLMIYDNUiF6PEaXSt5SoW8vq-cY",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD1LxHfaksy0lTMfYSJqjpYEKZNucxSerEpHsqgxKgnWOW9IxqkIMnNAAyvoUkKfnqMc7ptF5i9RK66a6xiym05ZbGvAA_dQoIhSErPVMUi7tNwo2gpHoNkyIYt13ycTZd9pVFLfUSi5fav3sFB3S_mbKuNMLId89xEbgrrkfXqHe5ByH5pvbrODwaYp4VE-4w5_UCPCr9khUWascYz6D01FocxFO_f0jCEKahGFawggip5GxiogN1s7Xdqv32v3yH9yFTYDQhiCm0",
]

const saveID=(id)=>{
    // key is visiola_cbc_ai_4
    localStorage.setItem("visiola_cbc_ai_4",id)
}

const generateId = () => {
    // generate a random string of length 4
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let id = ''
    for (let i = 0; i < 4; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    saveID(id)
    return id
}

const getID=()=>{
    const id = localStorage.getItem("visiola_cbc_ai_4")
    if (id === undefined){
        generateId()
    }

    return localStorage.getItem("visiola_cbc_ai_4")
}

const showResults=()=>{
    chat_container.style.display = "none"
    match_container.style.display = "block"
    message_input.style.display = "none"
}

const showChats=()=>{
    chat_container.style.display = "block"
    match_container.style.display = "none"
    message_input.style.display = "block"
}

const sendMessageToAPI = (method,endpoint,data={}) => {
    return new Promise((resolve, reject) => {
        fetch(`${address}/${endpoint}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`http_${res.status}`)
            }
            return res.json()
        })
        .then(data => {
            resolve(data)
        })
        .catch(err => {
            // ensure callers get an Error object
            reject(err instanceof Error ? err : new Error(String(err)))
        })
    })
}


const addAIMessage=message=>{
    messages.insertAdjacentHTML('beforeend',` <div class="flex items-start gap-4">
        <div
            class="flex-shrink-0 w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-lg">
            AI
        </div>
        <div class="flex flex-col gap-2">
            <div
                class="bg-pink-100 dark:bg-pink-900/30 text-black dark:text-white p-4 rounded-xl rounded-tl-none max-w-lg">
                <p class="font-medium">${message}</p>
            </div>
        </div>
    </div>`)
}

const addHumanMessage=message=>{
    messages.insertAdjacentHTML('beforeend',`<div class="flex items-start gap-4 justify-end">
                            <div class="bg-indigo-500 text-white p-4 rounded-xl rounded-tr-none max-w-lg">
                                <p>${message}</p>
                            </div>
                            <div
                                class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                                You
                            </div>
                        </div>`)
}

const opportunityFollowUpChat=(name)=>{
    submitMessage("Tell me more about : "+name)
    showChats()
}

const getARandomPictureFromImagePaths=()=>{
    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    return imagePaths[randomIndex];
}

const showOpportunities=(data)=>{
    let msg = ''

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        msg += `<div
                    class="bg-white dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col md:flex-row">
                    <div class="md:w-1/3">
                        <img alt="Scholarship image" class="h-48 w-full object-cover md:h-full"
                            src="${getARandomPictureFromImagePaths()}" />
                    </div>
                    <div class="p-6 flex-1 flex flex-col justify-between">
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <h3 class="text-xl font-bold">${element.name}</h3>
                                <span class="text-lg font-bold text-primary">${element.grant}</span>
                            </div>
                            <p class="text-subtle-light dark:text-subtle-dark text-sm mb-4">${element.target}</p>
                            <div
                                class="flex items-center gap-4 text-sm text-subtle-light dark:text-subtle-dark mb-4">
                                <span class="font-medium">Eligibility:${element.requirements}</span>
                                <span class="font-medium">Deadline: ${element.deadline}</span>
                            </div>
                        </div>
                        <button
                            onclick="opportunityFollowUpChat('${element.name}')"
                            class="self-start px-5 py-2.5 text-sm font-bold rounded-lg bg-primary text-white hover:bg-opacity-90 transition-opacity">
                            Apply Now
                        </button>
                    </div>
                </div>`
    }

    opportunity_container.innerHTML = msg
    showResults()
}

const submitMessage=(message=null)=>{
    const value = message? {value:message} : document.getElementById("user_message")
    
    if(value !== undefined && value.value.length > 0){
        console.log("sending message : ",value.value);
        const val = value.value
        addHumanMessage(value.value)
        addAIMessage("...")
        value.value = ""
        sendMessageToAPI("post","group4/",{message:val})
        .then(res=>{
            console.log(res);
            
            removeLastMessage()
            addAIMessage(res.ai_response.response)
            if(res.ai_response.scholarships){
                showOpportunities(res.ai_response.scholarships)
            }
//             showOpportunities([
//     {name:"First",grant:"10,000",target:"for smart students",requirements:"3.5 CGPA + ",deadline:"25th September 2025"},
//     {name:"First",grant:"10,000",target:"for smart students",requirements:"3.5 CGPA + ",deadline:"25th September 2025"},
//     {name:"First",grant:"10,000",target:"for smart students",requirements:"3.5 CGPA + ",deadline:"25th September 2025"}
// ])
        })

    }
}

const removeLastMessage=()=>{
    const lastChild = messages.lastElementChild;
    if (lastChild) {
        messages.removeChild(lastChild);
    }
}


window.addEventListener("load",()=>{
    addAIMessage("Hello! I'm here to help you find scholarships. Let's start with a few questions to understand your profile.")
    generateId()
})