from langchain.chat_models import init_chat_model
from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.graph import StateGraph, MessagesState, START, END
from pydantic import BaseModel, Field
from typing import Literal

class State(MessagesState):
    pass
class Schema(BaseModel):
    type: Literal["html","css","js"] = Field(description="Type of the file")
    code: str = Field("The code of the type")