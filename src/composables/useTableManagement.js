import { ref, computed } from 'vue'

export function useTableManagement() {
  const tables = ref([
        {
      id: 1,
      number: 5,
      seats: 4,
      x: 200,
      y: 120,
      status: 'occupied',
      server: '',
      serverColor: '',
      serverName: '',
      occupancy: '1/3',
      timeElapsed: '3',
      totalBill: 94.56,
      paidAmount: 0.00,
      partySize: 2,
      maxSeats: 4,
      tableType: 'square',
      lastUpdated: new Date()
    },
    {
      id: 2,
      number: 7,
      seats: 4,
      x: 180,
      y: 300,
      status: 'available',
      server: '',
      serverColor: '',
      serverName: '',
      occupancy: '0/4',
      timeElapsed: '0',
      totalBill: 0,
      paidAmount: 0,
      partySize: 0,
      maxSeats: 4,
      tableType: 'square',
      lastUpdated: new Date()
    },
    {
      id: 3,
      number: 6,
      seats: 2,
      x: 400,
      y: 120,
      status: 'occupied',
      server: '',
      serverColor: '',
      serverName: '',
      occupancy: '1/2',
      timeElapsed: '15',
      totalBill: 156.78,
      paidAmount: 0,
      partySize: 1,
      maxSeats: 2,
      tableType: 'round',
      lastUpdated: new Date()
    },
    {
      id: 4,
      number: 4,
      seats: 2,
      x: 500,
      y: 280,
      status: 'available',
      server: '',
      serverColor: '',
      serverName: '',
      occupancy: '0/2',
      timeElapsed: '0',
      totalBill: 0,
      paidAmount: 0,
      partySize: 0,
      maxSeats: 2,
      tableType: 'round',
      lastUpdated: new Date()
    },
    {
      id: 5,
      number: 3,
      seats: 4,
      x: 300,
      y: 350,
      status: 'occupied',
      server: '',
      serverColor: '',
      serverName: '',
      occupancy: '2/4',
      timeElapsed: '8',
      totalBill: 67.43,
      paidAmount: 0,
      partySize: 2,
      maxSeats: 4,
      tableType: 'square',
      lastUpdated: new Date()
    }
  ])

  const servers = ref([
    { 
      id: 'MT', 
      name: 'Michael T.', 
      color: '#EB2B95',
      activeTables: 2,
      totalTablesToday: 5,
      isActive: true
    },
    { 
      id: 'JS', 
      name: 'Jessica L.', 
      color: '#A9A300',
      activeTables: 1,
      totalTablesToday: 3,
      isActive: true
    },
    { 
      id: 'LA', 
      name: 'Liam', 
      color: '#EB722B',
      activeTables: 1,
      totalTablesToday: 4,
      isActive: true
    }
  ])

  const updateTablePosition = (tableId, newPosition) => {
    const table = tables.value.find(t => t.id === tableId)
    if (table) {
      table.x = newPosition.x
      table.y = newPosition.y
    }
  }

  const updateTableStatus = (tableId, newStatus) => {
    const table = tables.value.find(t => t.id === tableId)
    if (table) {
      table.status = newStatus
      table.lastUpdated = new Date()
      
      if (newStatus === 'available') {
        table.occupancy = '0/' + table.maxSeats
        table.partySize = 0
        table.timeElapsed = '0'
        table.totalBill = 0
        table.paidAmount = 0
      }
    }
  }

  const updateTableServer = (tableId, serverId) => {
    const table = tables.value.find(t => t.id === tableId)
    const server = servers.value.find(s => s.id === serverId)
    
    if (table && server) {
      table.server = serverId
      table.serverName = server.name
      table.serverColor = server.color
      table.lastUpdated = new Date()
    }
  }

  const getTableById = (tableId) => {
    return tables.value.find(t => t.id === tableId)
  }

  const getServerById = (serverId) => {
    return servers.value.find(s => s.id === serverId)
  }

  const getOtherTables = (excludeId) => {
    return tables.value.filter(table => table.id !== excludeId)
  }

  const formatTimeElapsed = (minutes) => {
    const mins = parseInt(minutes) || 0
    const hours = Math.floor(mins / 60)
    const remainingMins = mins % 60
    
    if (hours > 0) {
      return `${hours}:${remainingMins.toString().padStart(2, '0')}`
    }
    return `${remainingMins.toString().padStart(2, '0')}:00`
  }

  const randomlyAssignServers = () => {
    const serverIds = ['MT', 'JS', 'LA']
    
    tables.value.forEach(table => {
      const randomServerIndex = Math.floor(Math.random() * serverIds.length)
      const serverId = serverIds[randomServerIndex]
      const server = servers.value.find(s => s.id === serverId)
      
      if (server) {
        table.server = serverId
        table.serverName = server.name
        table.serverColor = server.color
      }
    })
  }

  const getTableSummary = computed(() => {
    const occupied = tables.value.filter(t => t.status === 'occupied').length
    const available = tables.value.filter(t => t.status === 'available').length
    const totalRevenue = tables.value.reduce((sum, t) => sum + t.totalBill, 0)
    
    return {
      occupied,
      available,
      total: tables.value.length,
      totalRevenue: totalRevenue.toFixed(2)
    }
  })

  randomlyAssignServers()

  return {
    tables,
    servers,
    updateTablePosition,
    updateTableStatus,
    updateTableServer,
    getTableById,
    getServerById,
    getOtherTables,
    formatTimeElapsed,
    getTableSummary,
    randomlyAssignServers
  }
} 