### T-542-HGOP <img align="right" width="150" height="150" src="http://iva2011.ru.is/images/default_mono.png">

**Instructors:** Guðlaugur Stefán Egilsson and Hannes Pétursson

**Teaching assistants:** Fanney Sigurðardóttir, Hrafn Orri Hrafnkelsson and Kristinn Þorri Þrastarson

---
# Answers - Day 11 :pencil2:

This Markdown Document contains our answers to the questions from the assignment scheduled for Day 11.

# Questions 

- **Explain why we put each consecutive call inside the onSuccess callback of the previous database call, instead of just placing them next to each other.** Because these are asyncronus callback functions, that all rely on the same database, if the first one fails there is no reason to call the other ones beacuse they will also fail if there is something wrong with the database connection. If one onSuccess is called then we call the next function and if we get to the last one then we have all the data that we need and we send the response back. 
- **What does the Done parameter do?**
The Done parameter is a callback function which is called when the test has failed or completed successfully, and returns up the stack to indicate which event occured. 


# Authors

Guðrún Margrét Ívansdóttir - gudruni17@ru.is

Hjörtur Jóhann Vignisson - hjorturv17@ru.is