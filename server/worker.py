from langchain.chat_models import init_chat_model
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
import json
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.graph import StateGraph, MessagesState, START, END
from pydantic import BaseModel, Field
from typing import Literal, List
load_dotenv()
class State(MessagesState):
    pass

class AIoutput(BaseModel):
    html:str =  Field(description="Full HTML Code")
    css:str =  Field(description="Full CSS Code")
    js:str =  Field(description="Full JS Code")
llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash")
llm_withCodeStructure = llm.with_structured_output(schema=AIoutput)

def webBuilder(state:State):
    response = llm_withCodeStructure.invoke(state.get("messages"))
    return {
"messages": [
            AIMessage(content=response.model_dump_json())
        ]
    }
graph_builder = StateGraph(State)
graph_builder.add_node("webBuilder", webBuilder)
graph_builder.add_edge(START,"webBuilder")
graph_builder.add_edge("webBuilder",END)
graph = graph_builder.compile()
systemPrompt = "You are an ai website builder agent which returns html,css,js files"
def process(query:str):
    initial_state = {
        "messages":[SystemMessage(systemPrompt), HumanMessage(query)]
    }
    for chunk in graph.stream(initial_state, stream_mode="values"):
        msg = chunk["messages"][-1]
        if msg.type=="ai":
            data = json.loads(msg.content)
            return data
while True:
    query = input(">> ")
    print(process(query=query))