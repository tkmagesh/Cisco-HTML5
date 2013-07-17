using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Fleck;

namespace CiscoWebSocketServer
{
    class Program
    {
        static void Main(string[] args)
        {
            var server = new WebSocketServer("ws://localhost:9090/SocketServer");
            var connections = new List<IWebSocketConnection>();
            server.Start(con =>
                {
                    con.OnOpen += () =>
                        {
                            Console.WriteLine("A new connection is establised");
                            connections.Add(con);
                        };
                    con.OnMessage += s =>
                        {
                            Console.WriteLine("Message received - {0}", s);
                            foreach (var connection in connections)
                            {
                                if (connection != con)
                                    connection.Send(s);
                            }

                        };
                    con.OnClose += () =>
                        {
                            Console.WriteLine("Client connection destroyed");
                            connections.Remove(con);
                        };
                });
            var input = string.Empty;
            while ((input = Console.ReadLine()) != "Exit")
            {
                foreach (var connection in connections)
                {
                    connection.Send(input);
                }
            }
            Console.WriteLine("shutting down..!!");
            Console.ReadLine();
        }
    }
}
